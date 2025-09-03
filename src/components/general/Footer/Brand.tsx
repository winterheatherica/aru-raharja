import Image from "next/image";

function BrandLogo() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[140px] h-[130px]">
        <Image
          src="/common/AruLogo.svg"
          alt="Aru Raharja Logo"
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 90vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

export default function AboutBlock() {
  return (
    <div className="space-y-6">
      <BrandLogo />
      <p className="font-normal text-[17px] leading-relaxed">
        PT Aru Raharja didirikan pada tanggal 14 Desember 1988. Perusahaan ini bergerak di berbagai bidang seperti Digital IT,  Outsourcing, Rent a Car, Building Management, Office Space Provider, Jasa Contractor, dan Supplier.
      </p>
    </div>
  );
}
