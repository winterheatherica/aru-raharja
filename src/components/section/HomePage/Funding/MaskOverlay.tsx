"use client";

export default function MaskOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover lg:bg-contain drop-shadow-[0_0_0px_white]"
        style={{ backgroundImage: "url('/images/general/masking/aru-mask-2-white.png')" }}
      />

      <div
        className="absolute inset-0 bg-no-repeat bg-cover lg:bg-contain transform -scale-x-100 -scale-y-100 hidden md:block drop-shadow-[0_0_0px_white]"
        style={{ backgroundImage: "url('/images/general/masking/aru-mask-2-white.png')" }}
      />
    </div>
  );
}
