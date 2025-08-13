import { NextResponse } from 'next/server';
export const runtime = "nodejs"; // Use Node.js runtime for server-side code

export async function GET() {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/jokes', {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY || '' // Store your API key in .env.local
      },
      cache: 'no-store', // Disable caching for fresh data
    });
    if (!response.ok) return NextResponse.json({ error: 'Failed to fetch jokes' }, { status: response.status });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch joke' }, { status: 500 });
  }
}
