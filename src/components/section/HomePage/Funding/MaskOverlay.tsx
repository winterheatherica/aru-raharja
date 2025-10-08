"use client";

export default function MaskOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover lg:bg-contain"
        style={{ backgroundImage: "url('/images/general/masking/masking-variant-1.3.png')" }}
      />

      <div
        className="absolute inset-0 bg-no-repeat bg-cover lg:bg-contain transform -scale-x-100 -scale-y-100 hidden md:block"
        style={{ backgroundImage: "url('/images/general/masking/masking-variant-1.3.png')" }}
      />
    </div>
  );
}
