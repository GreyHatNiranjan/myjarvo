import { NextResponse } from 'next/server';  // Import NextResponse
import mysql from 'mysql2/promise';          // Use mysql2 with promises
import 'dotenv/config';

// Ensure required environment variables are defined
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DATABASE_TABLE_P } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE || !DB_DATABASE_TABLE_P) {
    console.error("Error: Missing one or more required environment variables.");
}

// Create the MySQL pool
const pool = mysql.createPool({
    host: DB_HOST || 'myjarvo.com',   // Use the IP or domain of the cPanel-hosted server
    user: DB_USER,                    // Use the MySQL user from cPanel
    password: DB_PASSWORD,            // Use the password from cPanel
    database: DB_DATABASE,            // Use the database from cPanel
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});

export async function GET(request) {
    try {
        // Retrieve all rows from the specified table
        const [rows] = await pool.query(`SELECT * FROM ${DB_DATABASE_TABLE_P}`);
        
        return new NextResponse(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  // Adjust to specific origin if needed
            },
        });
    } catch (err) {
        console.error('MySQL Query Error:', err.message);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: err.message }), {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',  // Adjust to specific origin if needed
            },
        });
    }
}

// Handle OPTIONS request (for CORS preflight)
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',         // Adjust to specific origin if needed
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
