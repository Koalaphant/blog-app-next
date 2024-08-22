import React from "react";

export default function FixtureSection() {
  return (
    <div className="h-[500px] bg-slate-900 text-white flex flex-col justify-center items-center rounded-lg border-t-8 border-red-500 gap-4">
      <p>APR 14 - 14:00 GMT ANFIELD</p>
      <div className="flex mt-5">
        <div className="flex flex-col items-center">
          <div className="h-[50px] w-[50px] bg-cyan-50 mb-4"></div>
          <p>Liverpool</p>
        </div>
        <div className="flex items-center justify-center mx-3">
          <p>vs</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[50px] w-[50px] bg-cyan-50 mb-4"></div>
          <p>Arsenal</p>
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
