import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
// Create a single supabase client for interacting with your database
const supabase = createClient(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`, `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY} `)
export const dynamic = 'force-dynamic';
export async function GET(request) {

    //   // Replace the uri string with your connection string.
    //   const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@inventory.ibjhs.mongodb.net/`
    //   const client = new MongoClient(uri);
    try {
        // console.log("supabase used");
        


        let { data: Products, error } = await supabase
            .from('admin')
            .select('id, priority, title, price, discountedPrice, description, min_quantity, category, image1, image2, image3,image4, rating')
        // if(Products){
        
        // }
        if (error) {
            console.log(error)
        }


        // const database = client.db('stock');
        // const inventory = database.collection('inventory');
        // console.log("Hiiiiiiiiiiii");
        // const query = {};
        // const pro = await inventory.find(query)
        // console.log(pro);
        // const products = await inventory.find(query).toArray();
        // console.log("notsingle");
        return NextResponse.json({ success: true, Products })
        // return NextResponse.json({ success: true, Products })
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }

}
