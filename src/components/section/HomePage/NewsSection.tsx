import Image from "next/image";

export default function NewsSection() {
  const news = [
    { title: "Lorem Ipsum", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
    { title: "Lorem Ipsum", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
    { title: "Lorem Ipsum", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
  ];

  return (
    <section className="w-full bg-white py-[6vw] md:py-[2vw]">
      <div className="w-[76%] mx-auto">
        <h2 className="mb-[4vw] md:mb-[2%] font-bold tracking-tight text-black text-[8vw] md:text-[2.6vw]">
          Berita
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[3%] md:gap-[2%]">
          {news.map((item, i) => (
            <article
              key={i}
              className="rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#ECE8F8]">
                <Image
                  src="/news/template.jpg"
                  alt={`${item.title} thumbnail`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(min-width: 768px) 24vw, 76vw"
                />
              </div>

              <div className="p-[6%] pt-[4%] flex flex-col flex-1">
                <h3 className="font-semibold text-[120%]">{item.title}</h3>
                <p className="mt-[3%] text-gray-700 text-[90%] leading-relaxed line-clamp-3 flex-1">
                  {item.desc}
                </p>

                <div className="mt-[6%] flex justify-end">
                  <button
                    type="button"
                    className="
                      bg-gradient-to-t from-[#002AFE] to-[#A3A8FF]
                      text-white rounded-full shadow
                      px-[8%] py-[3%] text-[90%]
                      hover:brightness-105
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-offset-2 focus-visible:ring-[#7E8CFF]
                      ring-offset-white
                    "
                    aria-label={`Read more: ${item.title}`}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
