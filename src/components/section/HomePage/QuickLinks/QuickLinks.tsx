import QuickLinkItem from "./QuickLinkItem";
import type { Dictionary } from "@/i18n/getDictionary";

export default function QuickLinks({ dict }: { dict: Dictionary }) {
  const links = dict.quicklink;

  return (
    <div className="grid gap-4 pt-20 mt-6 lg:grid-cols-2">
      <QuickLinkItem
        title={links.x.title}
        buttonLabel={links.x.button}
        href="https://x.com/pt_jasaraharja"
        logoSrc="/icons/x.svg"
        logoAlt="X logo"
      />
      <QuickLinkItem
        title={links.tiktok.title}
        buttonLabel={links.tiktok.button}
        href="https://www.tiktok.com/@jasaraharja.official"
        logoSrc="/icons/tiktok.svg"
        logoAlt="TikTok logo"
      />
      <QuickLinkItem
        title={links.instagram.title}
        buttonLabel={links.instagram.button}
        href="https://www.instagram.com/aruraharja"
        logoSrc="/icons/instagram.svg"
        logoAlt="Instagram logo"
      />
      <QuickLinkItem
        title={links.facebook.title}
        buttonLabel={links.facebook.button}
        href="https://www.facebook.com/profile.php?id=100086789693911"
        logoSrc="/icons/facebook.svg"
        logoAlt="Facebook logo"
      />
    </div>
  );
}
