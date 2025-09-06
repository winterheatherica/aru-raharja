"use client";

export default function UserIcon({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="User"
      className={`rounded-lg p-2 text-neutral-700 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${className}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 20a6 6 0 0 0-12 0"></path>
        <circle cx="12" cy="10" r="4"></circle>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    </button>
  );
}
