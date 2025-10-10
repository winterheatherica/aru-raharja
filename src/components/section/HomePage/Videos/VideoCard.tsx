"use client";

import Image from "next/image";
import Link from "next/link";
import type { VideoItem } from "./data";

export default function VideoCard({
  item,
  readMoreLabel = "Watch",
}: {
  item: VideoItem;
  readMoreLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center flex-1 h-full p-2 rounded-lg shadow">
      <Link href={item.href} className="relative flex items-center w-full h-[230px] sm:h-[250px] lg:h-[290px]">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover rounded-lg"
          priority={false}
        />
      </Link>

      <div className="w-full p-3 pb-0 lg:p-5 lg:pb-0">
        <div className="flex justify-between w-full gap-6">
          <div className="flex items-center space-x-4">
            <span className="block w-3 h-3 rounded-full bg-bumn-gradient-primary-11 shrink-0" />
            <h3 className="text-lg font-bold lg:text-xl line-clamp-2 text-black">
              {item.title}
            </h3>
          </div>
          <p className="font-sans text-base lg:text-lg text-black/50">{item.date}</p>
        </div>
      </div>

      <div className="w-full p-3 pt-2 pb-1 mt-auto space-y-3 lg:pb-3 lg:p-5 lg:pt-2">
        <div className="mt-auto text-base text-black/60 font-lato line-clamp-2">
          {item.excerpt}
        </div>

        <Link
          href={item.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline-offset-4 hover:underline h-9 rounded-full p-0"
        >
          <span className="block">{readMoreLabel}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
