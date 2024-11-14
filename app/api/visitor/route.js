import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import 'dotenv/config';

export const dynamic = 'force-dynamic';

// Initialize MySQL pool with error handling for missing environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000
});

export async function GET(req) {
    try {
        // Retrieve IP address from headers or socket
        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0] ||
            req.socket?.remoteAddress;

        // Validate that IP was successfully obtained
        if (!ip) {
            throw new Error("Could not determine client IP address.");
        }

        // Calculate current timestamp in IST
        const rawTime = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds (5.5 hours)
        const currentTimestamp = new Date(rawTime.getTime() + istOffset).toISOString().slice(0, 19).replace('T', ' ');

        // Query database to check if the IP already exists
        const [existingUser] = await pool.query(
            'SELECT * FROM user_visits WHERE ip_address = ?',
            [ip]
        );

        if (existingUser.length > 0) {
            // IP exists, update visit_timestamps and last_visited
            const visitTimestamps = JSON.parse(existingUser[0].visit_timestamps);
            visitTimestamps.push(currentTimestamp);

            await pool.query(
                'UPDATE user_visits SET visit_timestamps = ?, last_visited = ? WHERE ip_address = ?',
                [JSON.stringify(visitTimestamps), currentTimestamp, ip]
            );

            return NextResponse.json({
                message: 'Welcome back!',
                ip,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // adjust as needed
                },
                // visits: visitTimestamps,
                // lastVisited: currentTimestamp,
            });
        } else {
            // IP does not exist, insert new record
            await pool.query(
                'INSERT INTO user_visits (ip_address, visit_timestamps, first_visited, last_visited) VALUES (?, ?, ?, ?)',
                [ip, JSON.stringify([currentTimestamp]), currentTimestamp, currentTimestamp]
            );

            return NextResponse.json({
                message: 'Welcome, new visitor!',
                ip,
                // visits: [currentTimestamp],
                // lastVisited: currentTimestamp,
            });
        }
    } catch (err) {
        console.error('MySQL Query Error:', err.message);
        return NextResponse.json({ error: 'Internal Server Error: ' + err.message }, { status: 500 });
    }
}
