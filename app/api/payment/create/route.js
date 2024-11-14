import { NextResponse } from 'next/server';
import 'dotenv/config'
export async function POST(request) {
  const { amount, name , email } = await request.json();

  const payload = {
    account_id: process.env.ZEROTIZE_ACCOUNT_ID,
    secret_key: process.env.ZEROTIZE_SECRET_KEY,
    payment_id: 'order_' + new Date().getTime(),
    payment_name:name ,
    email,
    payment_amount: amount,
    payment_currency: 'INR',
    payment_purpose: 'Payment',
    redirect_url:'/'
  };
// console.log(process.env.ZEROTIZE_ACCOUNT_ID,process.env.ZEROTIZE_SECRET_KEY);

  const response = await fetch('https://zerotize.in/api_payment_init', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  // console.log("sudy",payload);
  
  const result = await response.json();
  return NextResponse.json(result);
}
