"use client";

export default function MaskOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover md:hidden"
        style={{ backgroundImage: "url('/images/general/masking/aru-mask-1-white.png')" }}
      />

      <div
        className="absolute inset-0 bg-no-repeat bg-cover md:block lg:bg-contain hidden drop-shadow-[0_0_0px_white]"
        style={{ backgroundImage: "url('/images/general/masking/aru-mask-2-white.png')" }}
      />

      <div
        className="absolute inset-0 bg-no-repeat bg-cover lg:bg-contain transform -scale-x-100 -scale-y-100 hidden lg:block drop-shadow-[0_0_0px_white]"
        style={{ backgroundImage: "url('/images/general/masking/aru-mask-2-white.png')" }}
      />
    </div>
  );
}
