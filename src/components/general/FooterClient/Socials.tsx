import Image from "next/image";
import Link from "next/link";

type SocialLink = { href: string; iconSrc: string; label: string };

const socials: SocialLink[] = [
  { href: "https://www.instagram.com/aruraharja/", iconSrc: "/images/general/logo/Instagram.webp", label: "Instagram" },
  // { href: "https://x.com/", iconSrc: "/images/general/logo/Twitter.webp", label: "X / Twitter" },
  { href: "https://www.facebook.com/p/Aru-Raharja-100086789693911/", iconSrc: "/images/general/logo/Facebook.webp", label: "Facebook" },
  { href: "https://www.linkedin.com/company/pt-aru-raharja/", iconSrc: "/images/general/logo/Linkedin.webp", label: "LinkedIn" },
];

export default function Socials() {
  return (
    <div className="relative z-10 flex items-center gap-3 mt-10 mb-6 lg:mb-0">
      <div className="text-[15px] font-semibold">Follow Us</div>
      <div className="flex items-center gap-2">
        {socials.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
          >
            <Image src={s.iconSrc} alt={`${s.label} logo`} width={34} height={34} className="shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
