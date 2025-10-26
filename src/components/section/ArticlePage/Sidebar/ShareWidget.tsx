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
        <ul className="share-buttons flex gap-2 mt-3">
          <li><a className="p-2 border rounded" href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">FB</a></li>
          <li><a className="p-2 border rounded" href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">X</a></li>
          <li><a className="p-2 border rounded" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">WA</a></li>
          <li><a className="p-2 border rounded" href={`https://telegram.me/share/url?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">TG</a></li>
        </ul>
      </div>
    </div>
  );
}
