import Image from "next/image";

export default function Poet({ article }: any) {
  if (!article) return null;
  return (
    <div className="poet mb-8 p-4 border rounded-lg bg-white">
      <div className="flex items-start gap-4">
        <div className="poet-img w-24 h-24 rounded overflow-hidden">
          <Image src={article.image_src ?? "/images/default-author.png"} alt={article.posted_by ?? "Author"} width={100} height={100} />
        </div>
        <div className="poet-wrap">
          <div className="poet-info text-sm text-bumnslate-6">Meet the Author</div>
          <a className="poet-title block text-lg font-medium text-bumnblue-2" href="#" rel="nofollow noopener">{article.posted_by ?? "Author"}</a>
          <div className="poet-meta text-sm text-bumnslate-6 mt-2">
            I am a digital content expert and blogger, providing valuable insights, resources, and guidance to help you elevate your online experience.
          </div>
          <div className="poet-link flex gap-2 mt-3">
            <a href="#" title="Twitter" className="p-2 rounded bg-bumngray-8">T</a>
            <a href="#" title="Linkedin" className="p-2 rounded bg-bumngray-8">L</a>
          </div>
        </div>
      </div>
    </div>
  );
}
