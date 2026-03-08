type Props = {
  label: string;
};

export default function RoomCta({ label }: Props) {
  return (
    <a
      href="https://wa.me/6281227008100"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-11 px-5 py-2.5 text-sm font-semibold text-white shadow-bumn-2 transition hover:opacity-95"
    >
      {label}
    </a>
  );
}
