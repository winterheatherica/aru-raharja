import Link from "next/link";

export default function ClassicCaps({ crumbs }: { crumbs: Array<{ label: string; href?: string }> }) {
  return (
    <div className="classic-caps mb-4 text-sm text-bumnslate-6">
      {crumbs.map((c, i) => (
        <span key={i} className="inline-flex items-center">
          {c.href ? (
            <Link href={c.href} className="text-bumnblue-2 hover:underline">
              {c.label}
            </Link>
          ) : (
            <span>{c.label}</span>
          )}
          {i < crumbs.length - 1 && (
            <em className="delimiter mx-2 inline-flex" aria-hidden>
              <svg className="bi bi-chevron-right" fill="currentColor" height="16" viewBox="0 0 16 16" width="12" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" fillRule="evenodd"></path>
              </svg>
            </em>
          )}
        </span>
      ))}
    </div>
  );
}
