import React from "react";
import { TrendData } from "../Data/TrendData.js";

const TrendCard = () => {
  return (
    <div className="flex flex-col gap-3 bg-cardColor p-4 rounded-lg pl-5 shadow w-full">
      <h3 className="font-bold text-clampSm mb-2">Trends for you</h3>

      {TrendData.map((trend) => (
        <div className="flex flex-col gap-1" key={trend.id}>
          <span className="text-clampXs font-bold">#{trend.name}</span>
          <span className="text-clamp2Xs text-gray-500">{trend.shares}k shares</span>
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
