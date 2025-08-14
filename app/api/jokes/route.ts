import { NextResponse } from 'next/server';
export const runtime = "nodejs"; // Useing Node.js runtime for server-side code

// any get request to for jokes will be handled by this function
export async function GET() {
  try {
    //making a quest to the API Ninjas for jokes 
    const response = await fetch('https://api.api-ninjas.com/v1/jokes', {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY || '' // getting the api key that is stored in the .env file
      },
      cache: 'no-store', // Dfresh data on every request
    });

    // For if the response fails for what ever reason, provide the error (debugging)
    if (!response.ok) return NextResponse.json({ error: 'Failed to fetch jokes' }, { status: response.status });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return NextResponse.json({ error: 'Failed to fetch joke' }, { status: 500 });
  }
}
