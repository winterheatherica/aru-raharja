"use client";

import LeftStatement from "./BottomScroller/LeftStatement";
import PromoCarousel from "./PromoCarousel/PromoCarousel";
import type { Dictionary, Locale } from "@/i18n/get_dictionary";

const slides = [
  { title: "Twibbon #HUTAruRaharja", src: "/images/home/duties-promo/hut-aru-raharja-37.png", alt: "Twibbon #HUTAruRaharja" },
  { title: "Himbauan Kami", src: "/images/home/duties-promo/hut-aru-raharja-37.png", alt: "Himbauan Kami" },
];

const cards = [
  {
    title: "Web Development",
    subtitle: "Pengembangan website responsif dan modern untuk mendukung kebutuhan digital perusahaan Anda.",
    iconSrc: "/images/home/duties-promo/icon-1.png",
    alt: "web-development",
  },
  {
    title: "Mobile Apps",
    subtitle: "Pengembangan aplikasi mobile native dan cross-platform yang andal dan mudah digunakan.",
    iconSrc: "/images/home/duties-promo/icon-2.png",
    alt: "mobile-apps",
  },
  {
    title: "UI/UX Design",
    subtitle: "Perancangan antarmuka dan pengalaman pengguna yang intuitif dan berorientasi pada kebutuhan user.",
    iconSrc: "/images/home/duties-promo/icon-3.png",
    alt: "ui-ux-design",
  },
  {
    title: "Claim Management",
    subtitle: "Pengelolaan proses klaim secara terstruktur, cepat, dan transparan untuk meningkatkan efisiensi layanan.",
    iconSrc: "/images/home/duties-promo/icon-4.png",
    alt: "claim-management",
  },
  {
    title: "Contact Centre",
    subtitle: "Layanan pusat kontak untuk menangani komunikasi pelanggan secara profesional dan responsif.",
    iconSrc: "/images/home/duties-promo/icon-5.png",
    alt: "contact-centre",
  },
  {
    title: "Help Desk Hospital",
    subtitle: "Layanan bantuan dan pendampingan terkait rumah sakit guna memastikan pelayanan kesehatan yang optimal.",
    iconSrc: "/images/home/duties-promo/icon-6.png",
    alt: "help-desk-hospital",
  },
    {
    title: "ARUdigital",
    subtitle: "Layanan sistem informasi berbasis cloud yang menjadi solusi terbaik bagi seluruh kebutuhan bisnis Anda.",
    iconSrc: "/images/home/duties-promo/aru-digital.png",
    alt: "aru-digital",
  },
  {
    title: "ARUsolution",
    subtitle: "Layanan solusi yang dapat diimplementasikan dengan cepat dan disesuaikan dengan kebutuhan terbaik perusahaan Anda.",
    iconSrc: "/images/home/duties-promo/aru-solution.png",
    alt: "aru-solution",
  },
  {
    title: "ARUhealthcare",
    subtitle: "Layanan berbasis preventif bagi seluruh pegawai untuk meningkatkan produktivitas dan menekan biaya rawat inap.",
    iconSrc: "/images/home/duties-promo/aru-healthcare.png",
    alt: "aru-healthcare",
  },
  {
    title: "ARUlog",
    subtitle: "Layanan supplier yang menyediakan berbagai macam barang sebagai solusi terbaik bagi kebutuhan bisnis Anda.",
    iconSrc: "/images/home/duties-promo/aru-log.png",
    alt: "aru-log",
  },
  {
    title: "ARUcontractor",
    subtitle: "Layanan jasa konstruksi yang profesional dan qualified dengan komitmen kualitas dan ketepatan waktu.",
    iconSrc: "/images/home/duties-promo/aru-contractor.png",
    alt: "aru-contractor",
  },
  {
    title: "ARUtrans",
    subtitle: "Layanan sewa kendaraan yang fleksibel dan andal untuk mendukung mobilitas bisnis Anda.",
    iconSrc: "/images/home/duties-promo/aru-trans.png",
    alt: "aru-trans",
  },
  {
    title: "ARUsource",
    subtitle: "Layanan penyedia tenaga kerja profesional dan qualified untuk mendukung operasional perusahaan Anda.",
    iconSrc: "/images/home/duties-promo/aru-source.png",
    alt: "aru-source",
  },
  {
    title: "ARUspace",
    subtitle: "Menyediakan working space, virtual office, dan event space di lokasi strategis untuk kebutuhan bisnis Anda.",
    iconSrc: "/images/home/duties-promo/aru-space.png",
    alt: "aru-space",
  },
];


type Props = { dict: Dictionary; locale: Locale };

export default function DutiesPromo({ dict }: Props) {
  const t = dict.home.dutiesPromo;

  return (
    <section className="relative animate-fade-down">
      <div className="relative grid gap-6 mt-6 lg:grid-cols-5">
        <LeftStatement title={t.heading} descPrefix={t.descPrefix} laws={t.laws} cards={cards} />
        <PromoCarousel slides={slides} autoplayMs={5000} />
      </div>
    </section>
  );
}
