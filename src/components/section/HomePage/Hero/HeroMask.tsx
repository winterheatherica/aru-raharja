import Image from "next/image";

type HeroMaskProps = {
  src?: string | null;
  className?: string;
};

export default function HeroMask({ src, className = "" }: HeroMaskProps) {
  const hasSrc = typeof src === "string" && src.trim() !== "";
  if (!hasSrc) return null;

  return (
    <div
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden h-full",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="relative left-1/2 -translate-x-1/2 w-[120%] h-full">
        <Image src={src!} alt="hero-mask" fill className="object-cover" priority />
      </div>
    </div>
  );
}
