import QuickLinkItem from "./QuickLinkItem";
import type { Dictionary } from "@/i18n/get_dictionary";

type Props = { dict: Dictionary };

export default function QuickLinks({ dict }: Props) {
  const links = dict.home.quicklink;

  return (
    <section className="grid gap-4 pt-20 mt-6 lg:grid-cols-2">
      <QuickLinkItem
        title={links.instagram.title}
        buttonLabel={links.instagram.button}
        href="https://www.instagram.com/aruraharja"
        logoSrc="/images/general/logo/instagram.svg"
        logoAlt="Instagram logo"
        hoverColor="
          group-hover:[background-image:linear-gradient(135deg,#405DE6,#5851DB,#833AB4,#C13584,#E1306C,#FD1D1D,#F56040,#F77737,#FCAF45)]
        "
      />

      <QuickLinkItem
        title={links.facebook.title}
        buttonLabel={links.facebook.button}
        href="https://www.facebook.com/profile.php?id=100086789693911"
        logoSrc="/images/general/logo/facebook.svg"
        logoAlt="Facebook logo"
        hoverColor="group-hover:bg-bumn-gradient-primary-11"
      />
    </section>
  );
}
