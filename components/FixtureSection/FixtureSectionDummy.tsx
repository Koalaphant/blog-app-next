import React from "react";
import { dummyFixtures } from "@/lib/dummyData";
import Image from "next/image";

export default function FixtureSectionDummy() {
  const fixtures = dummyFixtures;
  const homeTeamLogoUrl = fixtures[0].response[0].teams.home.logo;
  const awayTeamLogoUrl = fixtures[0].response[0].teams.away.logo;
  const homeTeamName = fixtures[0].response[0].teams.home.name;
  const awayTeamName = fixtures[0].response[0].teams.away.name;
  const homeGoals = fixtures[0].response[0].goals.home;
  const awayGoals = fixtures[0].response[0].goals.away;

  return (
    <div className="bg-slate-800">
      <div className="flex justify-between max-w-md mx-auto">
        {/* last game */}
        <div>
          <div>
            <img src={homeTeamLogoUrl} alt={`${homeTeamName} logo`} />
            
          </div>
          <div></div>
        </div>
        {/* next game */}
      </div>
    </div>
  );
}
