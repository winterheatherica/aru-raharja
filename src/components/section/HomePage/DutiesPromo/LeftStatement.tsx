"use client";

import MaskOverlay from "./MaskOverlay";

export default function LeftStatement() {
  return (
    <div className="lg:col-span-3 p-6 sm:p-12 text-white relative bg-bumn rounded-xl h-[600px] sm:h-[580px] md:h-[540px] lg:h-[680px] xl:h-[640px]">
      <div className="space-y-4 text-center sm:space-y-6 lg:space-y-8">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize font-inter lg:leading-[54px]">
          Tugas Pokok Aru Raharja untuk masyarakat
        </h2>
        <p className="font-sans text-lg font-normal sm:text-xl lg:text-2xl lg:leading-9">
          Aru Raharja sebagai penjamin pertama Korban kecelakaan Lalu Lintas
          sesuai <b>UU No. 33 Tahun 1964</b> dan <b>UU No. 34 Tahun 1964</b>
        </p>
      </div>
      <MaskOverlay />
    </div>
  );
}
