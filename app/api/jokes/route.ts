import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/jokes', {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY || '' // Store your API key in .env.local
      }
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch joke' }, { status: 500 });
  }
}
