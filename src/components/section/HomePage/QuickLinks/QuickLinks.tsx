import QuickLinkItem from "./QuickLinkItem";
import type { Dictionary } from "@/i18n/get_dictionary";

type Props = { dict: Dictionary };

export default function QuickLinks({ dict }: Props) {
  const links = dict.home.quicklink;

  return (
    <section className="grid gap-4 pt-20 mt-6 lg:grid-cols-2">
      <QuickLinkItem
        title={links.x.title}
        buttonLabel={links.x.button}
        href="https://x.com/pt_jasaraharja"
        logoSrc="/images/general/logo/x.svg"
        logoAlt="X logo"
      />
      <QuickLinkItem
        title={links.tiktok.title}
        buttonLabel={links.tiktok.button}
        href="https://www.tiktok.com/@jasaraharja.official"
        logoSrc="/images/general/logo/tiktok.svg"
        logoAlt="TikTok logo"
      />
      <QuickLinkItem
        title={links.instagram.title}
        buttonLabel={links.instagram.button}
        href="https://www.instagram.com/aruraharja"
        logoSrc="/images/general/logo/instagram.svg"
        logoAlt="Instagram logo"
      />
      <QuickLinkItem
        title={links.facebook.title}
        buttonLabel={links.facebook.button}
        href="https://www.facebook.com/profile.php?id=100086789693911"
        logoSrc="/images/general/logo/facebook.svg"
        logoAlt="Facebook logo"
      />
    </section>
  );
}
