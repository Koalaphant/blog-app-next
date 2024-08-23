import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_API_FOOTBALL;
  if (!apiKey) {
    return NextResponse.json({ error: "API key is not defined in the environment variables." }, { status: 500 });
  }

  try {
    const response = await fetch("https://v3.football.api-sports.io/fixtures?team=40&season=2024", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: `Error finding fixtures: ${err}` }, { status: 500 });
  }
}