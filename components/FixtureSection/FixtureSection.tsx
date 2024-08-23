import React from "react";
import fetchFixtures from "@/lib/fetchFixtures";

export default async function FixtureSection() {
  let fixtures = [];

  try {
    const data = await fetchFixtures();
    fixtures = data.response || [];
  } catch (err) {
    console.error(`Error fetching fixtures: ${err}`);
  }

  // Handle case when no fixtures are available
  if (fixtures.length === 0) {
    return (
      <div className="h-[500px] bg-slate-900 text-white flex flex-col justify-center items-center rounded-lg border-t-8 border-red-500 gap-4">
        <p>No fixtures available</p>
      </div>
    );
  }

  // Assuming you want to display the first fixture for demonstration purposes
  const fixture = fixtures[0];

  return (
    <div className="h-[500px] bg-slate-900 text-white flex flex-col justify-center items-center rounded-lg border-t-8 border-red-500 gap-4">
      <p>
        {new Date(fixture.fixture.date).toLocaleDateString()} -{" "}
        {new Date(fixture.fixture.date).toLocaleTimeString()} GMT{" "}
        {fixture.fixture.venue.name}
      </p>
      <div className="flex mt-5">
        <div className="flex flex-col items-center">
          <img
            src={fixture.teams.home.logo}
            alt={fixture.teams.home.name}
            className="h-[50px] w-[50px] mb-4"
          />
          <p>{fixture.teams.home.name}</p>
        </div>
        <div className="flex items-center justify-center mx-3">
          <p>vs</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={fixture.teams.away.logo}
            alt={fixture.teams.away.name}
            className="h-[50px] w-[50px] mb-4"
          />
          <p>{fixture.teams.away.name}</p>
        </div>
      </div>
      <div>
        <button className="bg-red-800 px-4 py-2 rounded-lg">
          View All 23/24 Fixtures
        </button>
      </div>
    </div>
  );
}
