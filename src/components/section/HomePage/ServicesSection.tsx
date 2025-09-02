import Image from "next/image";

export default function ServicesSection() {
  const services = [
    { title: "Lorem Ipsum", subtitle: "Lorem Ipsum", img: "/services/shield.png" },
    { title: "Lorem Ipsum", subtitle: "Lorem Ipsum", img: "/services/user.png" },
    { title: "Lorem Ipsum", subtitle: "Lorem Ipsum", img: "/services/megaphone.png" },
  ];

  return (
    <section className="w-full flex justify-center py-[6vw] md:py-[2vw] bg-white">
      <div className="w-[76%] md:w-[76%] aspect-auto md:aspect-[4.46/1] relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[3%] md:gap-[2%] h-full">
          {services.map((s, i) => (
            <div
              key={i}
              className="
                relative rounded-xl shadow text-white overflow-hidden
                bg-gradient-to-br from-[#A3A8FF] to-[#002AFE]
                p-[6%] h-full
              "
            >
              <h3 className="font-semibold leading-tight text-[6vw] md:text-[2.2vw]">{s.title}</h3>
              <p className="opacity-90 text-[3.8vw] md:text-[1.4vw]">{s.subtitle}</p>

              <div className="flex">
                <button
                  type="button"
                  className="
                    bg-white text-[#002AFE] rounded-lg font-medium shadow hover:brightness-95 transition
                    mt-[4%] md:mt-[14%] ml-[8%] md:ml-[12%]
                    text-[3.2vw] md:text-[1.2vw]
                    px-[6vw] md:px-[1.8vw] py-[2.4vw] md:py-[0.8vw]
                  "
                >
                  Go
                </button>
              </div>

              <div className="pointer-events-none absolute right-0 bottom-0 w-[55%] md:w-[55%] h-[60%] md:h-[60%]">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-contain object-right-bottom select-none"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
