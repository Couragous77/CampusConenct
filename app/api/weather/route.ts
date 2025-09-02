// app/api/weather/route.ts
import { NextResponse } from 'next/server';
export const runtime = "nodejs"; // Useing Node.js runtime for server-side code

// GET request to fetch weather data
export async function GET() {
  try {
    // Request weather data from OpenWeatherMap API (specific to Frostburg, MD)
    const city = 'Frostburg';
    const apiKey = process.env.OPENWEATHERMAP_KEY; //key is privately stored in .env file. Great for security
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`; // Using F insteadd of C

    
    const response = await fetch(url, { cache: 'no-store' }); // We want fresh data on every request
    //(debugging) If errors occur, log them
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json({ error: errorData.message || "Failed to fetch weather"}, { status: response.status });
    }

    // look for the data in the response
    const data = await response.json();
    const weatherInfo = {
      temp: Math.round(data.main?.temp), // To get the temperature rounded
      description: data.weather?.[0]?.description, 
      icon: data.weather?.[0]?.icon,
      location: data.name || 'Frostburg, MD'
    };

    return NextResponse.json(weatherInfo);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
