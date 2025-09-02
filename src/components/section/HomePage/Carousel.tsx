import Image from "next/image";

export default function Carousel() {
  return (
    <div className="w-[calc(100%*17/18)] mx-auto">
      <Image
        src="/carousel/Carousel_1.svg"
        alt="Carousel1"
        width={0}
        height={0}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
