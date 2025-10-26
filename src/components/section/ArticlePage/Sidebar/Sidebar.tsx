"use client";

import FollowWidget from "./FollowWidget";
import ShareWidget from "./ShareWidget";

export default function Sidebar({ article, locale }: any) {
  if (!article) return null;
  return (
    <div className="sidebar space-y-6">
      <FollowWidget />
      <ShareWidget article={article} />
    </div>
  );
}
