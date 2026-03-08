import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function BackNavigation({ href, label }: Props) {
  return (
    <div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-11 px-5 py-2.5 text-sm font-semibold text-white shadow-bumn-2 transition hover:opacity-95"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
          <path
            d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
            fill="currentColor"
          />
        </svg>
        <span>{label}</span>
      </Link>
    </div>
  );
}
