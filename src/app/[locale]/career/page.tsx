import { getDictionary, type Locale } from "@/i18n/getDictionary";
import Image from "next/image";

export default async function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className="relative px-2 py-2 mx-auto max-w-screen-1440">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-300 to-blue-700 rounded-3xl w-full min-h-40 md:min-h-60 lg:min-h-80">
        <div className="relative text-white z-[2] p-12 w-full max-w-[40rem]">
          <h1 className="text-5xl font-bold">Karier</h1>
          <p className="text-lg mt-6">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.</p>
        </div>
        <div className="absolute rounded-3xl z-[1] min-h-40 md:w-[300px] lg:w-[360px] md:h-60 lg:h-80 justify-self-end bottom-0 left-[50rem]">
          <Image
              src="/career/career-bg.png"
              alt="Karir/Career"
              fill
              className="absolute z-0"
          />
        </div>
      </div>
        <div className="mt-10 lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="relative w-full lg:w-[400px] undefined"><input
                    className="flex h-9 w-full rounded-md border border-input transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 px-4 py-6 font-sans text-base bg-white shadow-none text-bumngray-3 ps-12"
                    placeholder="Cari Posisi" value=""/>
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-search w-6 h-6 text-bumnblue-5">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <button type="button" role="combobox" aria-controls="radix-:r86:" aria-expanded="false"
                            aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder=""
                            className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-4 py-6 text-base font-sans text-bumngray-3 shadow-none ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 w-full lg:w-[223px]">
                        <span>Semua Posisi</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="w-6 h-6 text-bumnblue-5" aria-hidden="true">
                            <path
                                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <button type="button" role="combobox" aria-controls="radix-:r87:" aria-expanded="false"
                            aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder=""
                            className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-4 py-6 text-base font-sans text-bumngray-3 shadow-none ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 w-full lg:w-[223px]">
                        <span>Semua Jenis</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="w-6 h-6 text-bumnblue-5" aria-hidden="true">
                            <path
                                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <button
                        className="inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-full lg:w-[223px] justify-between rounded-md whitespace-nowrap border border-input bg-transparent px-4 py-6 text-base font-sans text-bumngray-3 font-normal shadow-none ring-offset-background placeholder:text-bumngray-10 placeholder:italic overflow-hidden [&amp;_svg]:size-6"
                        role="combobox" aria-expanded="false" type="button" aria-haspopup="dialog"
                        aria-controls="radix-:r88:" data-state="closed"><span
                        className="line-clamp-1">Semua Lokasi</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-chevron-down w-6 h-6 text-bumnblue-5">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </main>
  );
}
