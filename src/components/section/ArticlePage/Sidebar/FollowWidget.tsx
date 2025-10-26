"use client";

export default function FollowWidget() {
  return (
    <div className="widget p-4 border rounded-lg bg-white">
      <div className="cs-follow flex items-start gap-4">
        <svg
          className="w-10 h-10 text-bumnblue-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path d="M2.94 6.5L10 11l7.06-4.5A2 2 0 0 0 15.999 4H4a2 2 0 0 0-1.06 2.5z" />
          <path d="M18 8.388l-7.06 4.513a2 2 0 0 1-1.88 0L2 8.388V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.388z" />
        </svg>

        <div>
          <div className="cs-title font-medium">
            Recieve New Theme Updates, Launches &amp; Offer&apos;s
          </div>
          <div className="cs-dec text-sm text-bumnslate-6">No promotional emails</div>

          <form
            action="https://app.gumroad.com/follow_from_embed_form"
            method="post"
            target="popupwindow"
          >
            <input type="hidden" name="seller_id" value="9584298931077" />
            <input
              className="cs-email mt-3 w-full border rounded px-3 py-2"
              name="email"
              placeholder="Your email address"
              required
              type="email"
            />
            <div className="mt-3">
              <button className="cs-subscribe inline-block bg-bumnblue-2 text-white px-4 py-2 rounded">
                Follow
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
