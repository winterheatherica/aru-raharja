import Image from "next/image";

export default function StatsSection() {
  const stats = [
    { value: "99", label: "Lorem Ipsum" },
    { value: "99", label: "Lorem Ipsum" },
    { value: "99", label: "Lorem Ipsum" },
  ];

  return (
    <section className="w-full flex justify-center py-[6vw] md:py-[2vw]">
      <div className="relative w-[76%] md:w-[76%] aspect-auto md:aspect-[4.52/1]">
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-gray-100 shadow-sm">

          {/* ===== MOBILE (<768px) ===== */}
          <div className="md:hidden relative z-10 px-[4%] py-[5%] flex flex-col gap-[5vw]">
            <h2 className="text-center font-extrabold leading-tight
                           bg-gradient-to-b from-[#002AFE] to-[#A3A8FF]
                           bg-clip-text text-transparent
                           text-[5vw]">
              Melayani Hingga<br />Pelosok Negeri
            </h2>

            <div className="flex items-start gap-[4vw]">
              <span
                aria-hidden
                className="w-[2vw] h-[36vw] rounded-full
                           bg-gradient-to-t from-[#A3A8FF] to-[#002AFE]"
              />
              <div className="flex-1 flex flex-col gap-[3.5vw]">
                {stats.map((s, idx) => (
                  <div key={idx} className="flex items-end gap-[2vw]">
                    <p className="font-extrabold text-gray-900 leading-none text-[7vw]">{s.value}</p>
                    <p className="font-semibold text-gray-800 text-[3.6vw]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-[2.4vw]
                           rounded-full text-white font-semibold shadow hover:brightness-105 transition
                           bg-gradient-to-t from-[#002AFE] to-[#A3A8FF]
                           px-[6vw] py-[3vw] text-[4vw]"
              >
                <span>Hubungi Kami</span>
                <Image
                  src="/stats/cs.png"
                  alt="Customer Service"
                  width={0}
                  height={0}
                  className="object-contain"
                  style={{ width: "1.2em", height: "1.2em" }}
                  priority
                />
              </button>
            </div>
          </div>

          {/* ===== DESKTOP (≥768px) ===== */}
          <div className="hidden md:flex relative z-10 h-full flex-row items-start justify-between gap-[2.5%] px-[3%] py-[3%]">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-[5%]">
                {stats.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-[1.2vw] flex-1">
                    <span
                      aria-hidden
                      className="w-[0.5vw] h-[6vw] rounded-full
                                 bg-gradient-to-t from-[#A3A8FF] to-[#002AFE]"
                    />
                    <div className="text-left leading-none">
                      <p className="font-extrabold text-gray-900 text-[3.2vw] leading-none">{s.value}</p>
                      <p className="font-semibold text-gray-800 mt-[0.6vw] text-[1.2vw]">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-[2.2vw] ml-[5%]">
                <button
                  type="button"
                  className="inline-flex items-center gap-[0.8vw]
                             rounded-full text-white font-semibold shadow hover:brightness-105 transition
                             bg-gradient-to-t from-[#002AFE] to-[#A3A8FF]
                             px-[2.2vw] py-[0.9vw] text-[1.1vw]"
                >
                  <span>Hubungi Kami</span>
                  <Image
                    src="/stats/cs.png"
                    alt="Customer Service"
                    width={0}
                    height={0}
                    className="object-contain"
                    style={{ width: "1.2em", height: "1.2em" }}
                    priority
                  />
                </button>
              </div>
            </div>

            <div className="flex-1 flex justify-end items-start">
              <p className="text-right font-extrabold leading-tight
                            bg-gradient-to-b from-[#002AFE] to-[#A3A8FF]
                            bg-clip-text text-transparent
                            text-[1.6vw]">
                Melayani Hingga<br />Pelosok Negeri
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 bottom-0 w-full h-full opacity-30 md:opacity-60">
            <Image
              src="/stats/indonesia.png"
              alt="Peta Indonesia"
              fill
              className="object-contain object-right-bottom select-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
