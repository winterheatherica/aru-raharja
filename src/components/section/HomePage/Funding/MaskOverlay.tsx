"use client";

export default function MaskOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Gambar kiri (selalu tampil) */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover lg:bg-contain"
        style={{ backgroundImage: "url('/masking/masking-variant-1.3.png')" }}
      />

      {/* Gambar kanan (mirror) — sembunyikan di bawah md */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover lg:bg-contain transform -scale-x-100 -scale-y-100 hidden md:block"
        style={{ backgroundImage: "url('/masking/masking-variant-1.3.png')" }}
      />
    </div>
  );
}
