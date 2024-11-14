import { NextResponse } from 'next/server';
import 'dotenv/config'
export async function POST(request) {
  const { payment_id } = await request.json();

  const payload = {
    account_id: process.env.ZEROTIZE_ACCOUNT_ID,
    secret_key: process.env.ZEROTIZE_SECRET_KEY,
    payment_id,
  };

  const response = await fetch('https://zerotize.in/api_payment_status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
//   console.log(response);
  
  const result = await response.json();
  return NextResponse.json(result);
}
