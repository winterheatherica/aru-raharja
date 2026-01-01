"use client";

export default function MaskOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/images/general/masking/aru-mask-1-white.png')" }}
      />
    </div>
  );
}
