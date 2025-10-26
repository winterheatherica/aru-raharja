"use client";

export default function FollowWidget() {
  return (
    <div className="widget p-4 border rounded-lg bg-white">
      <div className="cs-follow flex items-start gap-4">
        <svg className="w-10 h-10 text-bumnblue-2" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697Z"></path></svg>
        <div>
          <div className="cs-title font-medium">
            Recieve New Theme Updates, Launches &amp; Offer&apos;s
          </div>
          <div className="cs-dec text-sm text-bumnslate-6">No promotional emails</div>
          <form action="https://app.gumroad.com/follow_from_embed_form" method="post" target="popupwindow" onSubmit={() => {}}>
            <input type="hidden" name="seller_id" value="9584298931077" />
            <input className="cs-email mt-3 w-full border rounded px-3 py-2" name="email" placeholder="Your email address" required type="email" />
            <div className="mt-3">
              <button className="cs-subscribe inline-block bg-bumnblue-2 text-white px-4 py-2 rounded">Follow</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
