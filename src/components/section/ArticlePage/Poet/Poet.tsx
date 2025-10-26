import Image from "next/image";

export default function Poet({ article }: any) {
  if (!article) return null;
  return (
    <div className="poet mb-8 p-4 border border-bumngray-8 rounded-lg bg-bumnwhite-1 shadow-bumn-2">
      <div className="flex items-start gap-4">
        <div className="poet-img w-16 h-16 rounded overflow-hidden">
          <Image
            src={"/images/services/aru-source.png"}
            alt={article.posted_by ?? "Author"}
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="poet-info text-sm text-bumnslate-6 mb-1">
            Meet the Author
          </div>
          <div className="poet-title text-bumnblue-2 font-medium text-lg mb-2">
            {article.posted_by ?? "Author"}
          </div>
          <div className="text-sm text-bumnslate-6 leading-relaxed">
            I am a digital content expert and blogger, providing valuable insights,
            resources, and guidance to help you elevate your online experience.
          </div>
        </div>
      </div>
    </div>
  );
}
  