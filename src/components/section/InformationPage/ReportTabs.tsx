"use client";

import React from "react";

export default function ReportTabs() {
  return (
    <div className="inline-flex flex-col items-center justify-center w-full p-1 pt-8 rounded-lg lg:flex-row text-[#1E1E1E5C] gap-4">
      <button
        type="button"
        className="inline-flex items-center justify-center w-full px-2 py-2 h-[44px] lg:h-[77px] 
        text-base font-normal transition-all rounded-md whitespace-normal text-center border 
        ring-offset-background focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
        disabled:opacity-50 bg-bumn-gradient-primary-12 text-white"
      >
        <span className="text-transparent bg-white text-bold bg-clip-text">
          Annual Report
        </span>
      </button>

      <button
        type="button"
        className="inline-flex items-center justify-center w-full px-2 py-2 h-[44px] lg:h-[77px] 
        text-base font-normal transition-all rounded-md whitespace-normal text-center border 
        ring-offset-background focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
        disabled:opacity-50 bg-bumn-gradient-white-2 border-[#D8D8D8BF]"
      >
        <span className="text-black">Sustainability Report</span>
      </button>
    </div>
  );
}
