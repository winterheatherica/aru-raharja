"use client";

import React from "react";

type ReportCardProps = {
  date: string;
  title: string;
  image: string;
};

export default function ReportCard({ date, title, image }: ReportCardProps) {
  return (
    <div className="relative flex rounded-xl bg-bumn-white-3 card__data cursor-pointer">
      <div className="w-full p-4 pt-6 space-y-4">
        <p className="font-sans text-gray-500 text-xs">{date}</p>
        <h3 className="font-bold text-black text-xl lg:text-xl line-clamp-2">
          {title}
        </h3>
        <div className="relative w-auto rounded-lg h-[378px]">
          <img
            alt={title}
            src={image}
            className="object-top rounded-lg object-contain absolute w-full h-full inset-0"
          />
        </div>
      </div>

      {/* Background Circle */}
      <div className="absolute w-24 h-24 bg-white rounded-full rotate card__icon -top-7 -right-7"></div>

      {/* Arrow Icon */}
      <div className="absolute flex justify-center items-center text-white -rotate-45 
        w-[58px] h-[58px] rounded-full bg-bumn-gradient-primary-9 -top-1 -right-1 shadow-inner-blue-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-right"
        >
          <path d="M18 8L22 12L18 16"></path>
          <path d="M2 12H22"></path>
        </svg>
      </div>
    </div>
  );
}
