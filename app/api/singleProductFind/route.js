import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import 'dotenv/config';
export const dynamic = 'force-dynamic';

// Check required environment variables
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
    console.error("Error: Missing one or more required environment variables.");
}

// Create MySQL pool
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,  // Reduced to avoid overloading shared hosting
    queueLimit: 10,       // Reduced to avoid overloading shared hosting
    connectTimeout: 20000
});

export async function GET(request) {
    try {
        // Parse URL and extract the search params
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        
// console.log(typeof id);

        // Validate id to prevent SQL injection and check if id is a positive integer
        if (!id || isNaN(id) || parseInt(id) <= 0) {
            return new NextResponse(JSON.stringify({ error: 'Invalid or missing ID parameter' }), { status: 400 });
        }

        // Use parameterized query to safely retrieve data
        const [rows] = await pool.query(
            `SELECT \`id\`, \`priority\`, \`title\`, \`price\`, \`discountedPrice\`, \`description\`, \`min_quantity\`, \`category\`, \`image1\`, \`image2\`, \`image3\`, \`image4\`, \`rating\`, \`QTY\`, \`show_in_Stock\` 
             FROM \`products\` WHERE id = ?`,
            [parseInt(id)]
        );

        if (rows.length === 0) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }));
        }
        // console.log(rows);
        
        return new NextResponse(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // adjust as needed
            },
        });
    } catch (err) {
        console.error('SingleProductFind MySQL Query Error:', err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: err.message }), { status: 500 });
    }
}
