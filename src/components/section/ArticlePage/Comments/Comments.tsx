"use client";

import React, { useState } from "react";

type Comment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

export default function Comments({ iframeSrc }: { iframeSrc?: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !name.trim()) return;
    setSubmitting(true);
    const newComment: Comment = {
      id: String(Date.now()),
      name: name.trim(),
      content: content.trim(),
      createdAt: new Date().toLocaleString(),
    };
    // in-memory only (no external calls)
    setTimeout(() => {
      setComments((s) => [newComment, ...s]);
      setName("");
      setEmail("");
      setContent("");
      setSubmitting(false);
    }, 300);
  };

  return (
    <div className="comments-section mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Leave a Comment</h3>
        <p className="text-sm text-bumnslate-6">
          Start discussion and ask your questions — I will be happy to answer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
        <div>
          <div className="mb-4">
            {comments.length === 0 ? (
              <div className="text-sm text-bumnslate-6 py-4">No comments yet. Be the first to comment.</div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="p-4 bg-white border border-bumngray-8 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-bumnblue-2">{c.name}</div>
                      <div className="text-xs text-bumnslate-6">{c.createdAt}</div>
                    </div>
                    <div className="text-sm text-bumnslate-6 whitespace-pre-wrap">{c.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={submitComment} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name *"
                required
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (optional)"
                type="email"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              required
              rows={5}
              className="w-full px-3 py-2 border rounded-md text-sm resize-none"
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center px-4 py-2 bg-bumnblue-2 text-white rounded-md text-sm disabled:opacity-60"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
              <span className="text-sm text-bumnslate-6">{comments.length} comments</span>
            </div>
          </form>
        </div>

        <aside className="hidden lg:block">
          <div className="p-4 bg-white border border-bumngray-8 rounded-lg">
            <div className="text-sm font-medium mb-2">Comments Policy</div>
            <div className="text-sm text-bumnslate-6">Be respectful. No spam. Your comment will appear immediately (stored locally only).</div>
          </div>

          {iframeSrc ? (
            <div className="mt-4 p-4 bg-white border border-bumngray-8 rounded-lg text-sm text-bumnslate-6">
              External comments are disabled for privacy and stability.
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
