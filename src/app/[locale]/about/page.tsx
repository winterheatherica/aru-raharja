import { getDictionary, type Locale } from "@/i18n/getDictionary";
import Image from "next/image";
import HistoryTabs from "@/components/section/AboutPage/HistoryTabs";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className="relative px-8 py-2 mx-auto max-w-screen-1440">
        <div className="relative justify-self-center items-center text-center sm:-mt-24 md:-mt-28 lg:-mt-32">
            <Image
                src="/stats-cta-map/indonesia.png"
                alt="map"
                width={600}
                height={100}
                className="-mb-12"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 text-transparent bg-clip-text">
                Tentang Aru Raharja
            </span>
        </div>
        <div className="relative justify-self-center mt-4 w-[80vw] h-[36vw] lg:w-[60vw] lg:h-[30vw]">
            <Image
                src="/common/gedung-1.png"
                alt="Gedung 1"
                fill
                className="rounded-2xl"
            />
        </div>
        <p className="my-10 text-2xl text-lg">
            PT Aru Raharja didirikan pada tanggal 14 Desember 1988. Perusahaan ini bergerak di berbagai bidang seperti Digital IT, Outsourcing, Rent a Car, Building Management, Office Space Provider, Jasa Contractor, dan Supplier.
        </p>
        <div className="relative justify-self-center w-[80vw] h-[36vw] md:w-[60vw] md:h-[30vw]">
            <Image
                src="/common/gedung-2.png"
                alt="Gedung 2"
                fill
                className="rounded-2xl"
            />
        </div>
        <div className="py-6">
            <h1 className="text-blue-500 text-2xl font-bold mb-4">Visi</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae.</p>
        </div>
        <div className="py-6">
            <h1 className="text-blue-500 text-2xl font-bold mb-4">Misi</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae.</p>
        </div>
        <div className="py-6">
            <h1 className="text-blue-500 text-2xl font-bold mb-4">Sejarah</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae.</p>
        </div>
        <div className="py-6 mt-6">
            <h1 className="text-blue-500 text-2xl font-bold mb-4">Jejak Langkah</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.</p>
        </div>
        <HistoryTabs />
        <div className="py-6">
            <h1 className="text-blue-500 text-2xl font-bold mb-4">Bidang Usaha</h1>
            <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                <br/><br/>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                <br/><br/>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
        </div>
        <div className="py-6">
                <h1 className="text-blue-500 text-2xl font-bold mb-4">Budaya Perusahaan</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.</p>
        </div>
        <div className="relative justify-self-center py-2 w-full h-[50vw] md:h-[40vw] lg:w-[80vw] lg:h-[40vw]">
            <Image
                src={`/common/akhlak.png`}
                alt={`akhlak`}
                fill
            />
        </div>
    </main>
  );
}
