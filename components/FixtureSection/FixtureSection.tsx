import React from "react";

interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

interface Goals {
  home: number | null;
  away: number | null;
}

interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: {
    id: number | null;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface Game {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: Goals;
  score: {
    halftime: Goals;
    fulltime: Goals;
    extratime: Goals | null;
    penalty: Goals | null;
  };
}

async function fetchFixtures(): Promise<{ response: Game[] }> {
  try {
    const response = await fetch("http://localhost:3000/api/fixtures", {
      next: { revalidate: 3600 },
    });
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
  let fixtures: Game[] = [];

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

  // Sort fixtures by timestamp
  fixtures.sort(
    (a: Game, b: Game) => a.fixture.timestamp - b.fixture.timestamp
  );

  // Get the current time
  const now = Date.now() / 1000;

  // Find the next game (the first one that hasn't started yet)
  const nextGame = fixtures.find((game: Game) => game.fixture.timestamp > now);

  if (!nextGame) {
    return (
      <div className="h-[100px] bg-slate-900 text-white flex justify-center items-center rounded-lg border-t-4 border-red-500">
        <p>No upcoming games</p>
      </div>
    );
  }

  // Extract next game details
  const nextGameHomeTeamLogoUrl = nextGame.teams.home.logo;
  const nextGameAwayTeamLogoUrl = nextGame.teams.away.logo;
  const nextGameHomeTeamName = nextGame.teams.home.name;
  const nextGameAwayTeamName = nextGame.teams.away.name;
  const nextGameDate = new Date(nextGame.fixture.date).toLocaleString();
  const nextGameVenue = nextGame.fixture.venue.name;
  const nextGameCity = nextGame.fixture.venue.city;

  return (
    // <div className="flex justify-center items-center">
    //   <div className="flex flex-col items-center bg-slate-700 p-6 rounded-lg shadow-md">
    //     <h1 className="text-white text-lg mb-4">Next Game</h1>
    //     <div className="flex items-center mb-4">
    //       {/* Home Team */}
    //       <div className="flex flex-col items-center mx-4">
    //         <img
    //           className="h-[50px] mb-2"
    //           src={nextGameHomeTeamLogoUrl}
    //           alt={`${nextGameHomeTeamName} logo`}
    //         />
    //         <p className="text-white text-sm">{nextGameHomeTeamName}</p>
    //       </div>
    //       {/* Versus Label */}
    //       <div className="text-white text-sm mx-2">vs</div>
    //       {/* Away Team */}
    //       <div className="flex flex-col items-center mx-4">
    //         <img
    //           className="h-[50px] mb-2"
    //           src={nextGameAwayTeamLogoUrl}
    //           alt={`${nextGameAwayTeamName} logo`}
    //         />
    //         <p className="text-white text-sm">{nextGameAwayTeamName}</p>
    //       </div>
    //     </div>
    //     <p className="text-white text-xs mb-1">{nextGameDate}</p>
    //     <p className="text-white text-xs">
    //       {nextGameVenue}, {nextGameCity}
    //     </p>
    //   </div>
    // </div>

    <div>ds</div>
  );
}
