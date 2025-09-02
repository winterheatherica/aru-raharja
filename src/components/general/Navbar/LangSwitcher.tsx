"use client";

import Link from "next/link";

export default function LangSwitcher() {
  return (
    <div className="ml-2 flex items-center pl-3 text-sm font-medium">
      <Link href="/id" className="text-blue-700 underline">
        ID
      </Link>
      <span className="mx-2 block h-4 w-px bg-neutral-300" />
      <Link href="/en" className="text-blue-700">
        EN
      </Link>
    </div>
  );
}
