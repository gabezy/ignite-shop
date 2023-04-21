import React from "react";

export default function SkeletonLoadingHome() {
  return (
      <div className="relative w-[690px] h-[656px] flex items-center justify-center rounded-lg bg-stone-800 animate-pulse">
        <div className="absolute bottom-1 left-1 right-1 rounded-md flex p-8 items-center justify-between bg-stone-600">
          <div className="flex flex-col gap-2">
            <div className="w-[252px] h-[32px] bg-gray-300 rounded-xl"></div>
            <div className="w-[97px] h-[37px] bg-gray-300 rounded-xl"></div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-gray-300"></div>
        </div>
      </div>
  );
}
