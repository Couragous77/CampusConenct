// app/api/weather/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const city = 'Frostburg';
    const apiKey = process.env.OPENWEATHERMAP_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: response.status });
    }

    const data = await response.json();
    const weatherInfo = {
      temp: Math.round(data.main?.temp),
      description: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon,
      location: data.name || 'Frostburg, MD'
    };

    return NextResponse.json(weatherInfo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
