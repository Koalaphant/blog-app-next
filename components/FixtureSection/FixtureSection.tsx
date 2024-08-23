import React from "react";

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
      <div className="h-[100px] bg-slate-900 text-white flex justify-center items-center rounded-lg border-t-4 border-red-500">
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
    <div className="bg-slate-800 flex justify-center items-center py-4 my-9">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 w-full max-w-6xl bg-slate-700 rounded-lg shadow-md">
        {/* Next Game Section */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <h1 className="text-white text-lg mb-2">Next Game</h1>
          <div className="flex items-center">
            {/* Home Team */}
            <div className="flex flex-col items-center mx-2">
              <img
                className="h-[50px] mb-1"
                src={nextGameHomeTeamLogoUrl}
                alt={`${nextGameHomeTeamName} logo`}
              />
              <p className="text-white text-sm">{nextGameHomeTeamName}</p>
            </div>
            {/* Versus Label */}
            <div className="flex flex-col items-center mx-2">
              <p className="text-white text-sm">vs</p>
            </div>
            {/* Away Team */}
            <div className="flex flex-col items-center mx-2">
              <img
                className="h-[50px] mb-1"
                src={nextGameAwayTeamLogoUrl}
                alt={`${nextGameAwayTeamName} logo`}
              />
              <p className="text-white text-sm">{nextGameAwayTeamName}</p>
            </div>
          </div>
          <p className="text-white font-light text-xs mt-2">{nextGameDate}</p>
          <p className="text-white font-light text-xs">{nextGameVenue}</p>
        </div>

        {/* Last Game Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 mt-10 md:mt-0">
          <h1 className="text-white text-lg mb-2">Last Game</h1>
          <div className="flex items-center">
            {/* Home Team */}
            <div className="flex flex-col items-center mx-2">
              <img
                className="h-[50px] mb-1"
                src={homeTeamLogoUrl}
                alt={`${homeTeamName} logo`}
              />
              <p className="text-white text-sm">{homeTeamName}</p>
              <p className="text-white text-sm mt-1">{homeGoals}</p>
            </div>
            {/* Versus Label */}
            <div className="flex flex-col items-center mx-2">
              <p className="text-white text-sm">vs</p>
            </div>
            {/* Away Team */}
            <div className="flex flex-col items-center mx-2">
              <img
                className="h-[50px] mb-1"
                src={awayTeamLogoUrl}
                alt={`${awayTeamName} logo`}
              />
              <p className="text-white text-sm">{awayTeamName}</p>
              <p className="text-white text-sm mt-1">{awayGoals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
