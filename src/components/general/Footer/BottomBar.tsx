import Link from "next/link";

export default function BottomBar() {
  const year = new Date().getFullYear();

  return (
    <div
      className="
        w-full px-4 py-3 font-op text-bumnslate-8
        relative
        lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-10
      "
    >
      <div className="flex flex-col items-center gap-4">
        <ul className="inline-flex items-center space-x-6 text-[15px]">
          <li><Link href="/legal" className="underline">Legal Terms</Link></li>
          <li><Link href="/privacy" className="underline">Privacy Policy</Link></li>
          <li><Link href="/accessibility" className="underline">Accessibility</Link></li>
        </ul>
        <p className="text-[15px] font-semibold">© {year} – Aru Raharja. All Rights Reserved.</p>
      </div>
    </div>
  );
}
