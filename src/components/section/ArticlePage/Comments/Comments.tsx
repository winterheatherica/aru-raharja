"use client";

export default function Comments({ iframeSrc }: { iframeSrc?: string }) {
  return (
    <div className="comments-section mt-6">
      <div className="flex-comments mb-4">
        <div className="new-comments">
          <div className="comments-mains text-lg font-semibold">Leave a Comment</div>
          <div className="comments-net text-sm text-bumnslate-6">Start discussion and ask your questions — I will be happy to answer.</div>
        </div>
      </div>

      <section className="comments threaded" id="comments">
        <div className="comments-content">
          <div id="comment-holder">
            <div className="commentForm">
              <div id="threaded-comment-form">
                {iframeSrc ? (
                  <iframe
                    className="blogger-iframe-colorize blogger-comment-from-post"
                    src={iframeSrc}
                    height={320}
                    title="Comments"
                    style={{ width: "100%", border: 0 }}
                  />
                ) : (
                  <div className="py-6 text-sm text-bumnslate-6">Comments are not available.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
