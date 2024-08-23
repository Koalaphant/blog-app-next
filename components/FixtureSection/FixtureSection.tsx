import React from "react";

// This function will fetch data from your local API route
async function fetchFixtures() {
  try {
    const response = await fetch("http://localhost:3000/api/fixtures");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching fixtures: ${err}`);
    return { response: [] };
  }
}

export default async function FixtureSection() {
  let fixtures = [];

  try {
    const data = await fetchFixtures();
    fixtures = data.response || [];
  } catch (err) {
    console.error(`Error fetching fixtures: ${err}`);
  }

  if (fixtures.length === 0) {
    return (
      <div className="h-[500px] bg-slate-900 text-white flex flex-col justify-center items-center rounded-lg border-t-8 border-red-500 gap-4">
        <p>No fixtures available</p>
      </div>
    );
  }

  const lastGame = fixtures[0];
  const nextGame = fixtures[1];

  const homeTeamLogoUrl = lastGame.teams.home.logo;
  const awayTeamLogoUrl = lastGame.teams.away.logo;
  const homeTeamName = lastGame.teams.home.name;
  const awayTeamName = lastGame.teams.away.name;
  const homeGoals = lastGame.goals.home;
  const awayGoals = lastGame.goals.away;

  const nextGameHomeTeamLogoUrl = nextGame.teams.home.logo;
  const nextGameAwayTeamLogoUrl = nextGame.teams.away.logo;
  const nextGameHomeTeamName = nextGame.teams.home.name;
  const nextGameAwayTeamName = nextGame.teams.away.name;
  const nextGameDate = new Date(nextGame.fixture.date).toLocaleString();
  const nextGameVenue = nextGame.fixture.venue.name;

  return (
    <div className="bg-slate-800 p-20 flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between p-10 w-full max-w-6xl bg-slate-700 rounded-lg">
        {/* Next Game Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-white text-2xl mb-6">Next Game</h1>
          <div className="flex justify-around w-full">
            {/* Home Team */}
            <div className="flex flex-col items-center">
              <img
                className="h-[80px] mb-2"
                src={nextGameHomeTeamLogoUrl}
                alt={`${nextGameHomeTeamName} logo`}
              />
              <p className="text-white text-xl">{nextGameHomeTeamName}</p>
            </div>
            {/* Versus Label */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-xl">vs</p>
            </div>
            {/* Away Team */}
            <div className="flex flex-col items-center">
              <img
                className="h-[80px] mb-2"
                src={nextGameAwayTeamLogoUrl}
                alt={`${nextGameAwayTeamName} logo`}
              />
              <p className="text-white text-xl">{nextGameAwayTeamName}</p>
            </div>
          </div>
          <p className="text-white font-light text-sm mt-4">{nextGameDate}</p>
          <p className="text-white font-light text-sm">{nextGameVenue}</p>
        </div>

        {/* Last Game Section */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <h1 className="text-white text-2xl mb-6">Last Game</h1>
          <div className="flex justify-around w-full">
            {/* Home Team */}
            <div className="flex flex-col items-center">
              <img
                className="h-[80px] mb-2"
                src={homeTeamLogoUrl}
                alt={`${homeTeamName} logo`}
              />
              <p className="text-white text-xl">{homeTeamName}</p>
              <p className="text-white text-xl mt-2">{homeGoals}</p>
            </div>
            {/* Versus Label */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-xl">vs</p>
            </div>
            {/* Away Team */}
            <div className="flex flex-col items-center">
              <img
                className="h-[80px] mb-2"
                src={awayTeamLogoUrl}
                alt={`${awayTeamName} logo`}
              />
              <p className="text-white text-xl">{awayTeamName}</p>
              <p className="text-white text-xl mt-2">{awayGoals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
