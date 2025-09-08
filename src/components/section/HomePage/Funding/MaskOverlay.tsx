"use client";

export default function MaskOverlay({ src }: { src?: string | null }) {
  if (!src) return null;
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
      <div
        className="absolute w-full h-full bg-no-repeat bg-cover lg:bg-contain"
        style={{ backgroundImage: `url('${src}')` }}
      />
    </div>
  );
}
