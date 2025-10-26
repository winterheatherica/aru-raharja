"use client";

export default function ShareWidget({ article }: any) {
  const url = typeof window !== "undefined" ? window.location.href : "#";
  return (
    <div className="widget p-4 border rounded-lg bg-white">
      <div className="feed-share">
        <div className="share-icon-center text-sm text-bumnslate-6 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 21 17" xmlns="http://www.w3.org/2000/svg"><path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"></path></svg>
          Share
        </div>
      </div>
    </div>
  );
}
