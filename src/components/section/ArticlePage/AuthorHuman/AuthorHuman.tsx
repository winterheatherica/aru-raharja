"use client";

import Image from "next/image";

export default function AuthorHuman({ article }: any) {
  if (!article) return null;

  const postedBy = article.published_by ?? "Unknown";
  const createdAt = article.created_at ?? "";
  const imageSrc =
    article.published_by_avatar_url || "/images/services/aru-source.png";

  return (
    <div className="human mb-8 flex items-center gap-5">
      <div className="human-img w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={imageSrc}
          alt={postedBy}
          width={56}
          height={56}
          className="object-cover"
        />
      </div>

      <div className="human-combine flex flex-col justify-center gap-2">
        <div className="human-name text-sm text-bumnslate-6 flex items-center flex-wrap gap-2">
          <svg
            fill="currentColor"
            height="15"
            viewBox="0 0 16 16"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" fillRule="evenodd"></path>
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          </svg>
          <span className="font-medium">Published By:</span>
          <span className="human-author text-bumnblue-2 font-medium">{postedBy}</span>
        </div>

        <div className="human-date text-sm text-bumnslate-6 flex items-center gap-2 mt-0.5">
          <svg
            fill="currentColor"
            height="14"
            viewBox="0 0 16 16"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7z"></path>
          </svg>
          <span>
            Last Update:{" "}
            <span className="human-time font-medium text-bumnblue-2">
              {createdAt}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

