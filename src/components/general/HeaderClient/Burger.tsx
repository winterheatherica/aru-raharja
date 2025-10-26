"use client";

type Props = {
  open: boolean;
  onToggle: () => void;
  className?: string;
};

export default function Burger({ open, onToggle, className }: Props) {
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls="desktop-nav-panel"
      onClick={onToggle}
      className={`z-10 flex h-[86px] w-[86px] cursor-pointer flex-col items-center justify-center gap-[4.5px] rounded-2xl transition duration-500 ${className ?? ""}`}
    >
      <span
        className={`h-1 w-[25px] origin-left rounded-sm bg-bumncyan-2 transition duration-500 ${
          open ? "rotate-45" : ""
        }`}
      />
      <span
        className={`h-1 w-[25px] rounded-sm bg-bumnblue-2 transition duration-500 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-1 w-[25px] origin-left rounded-sm bg-bumnblue-8 transition duration-500 ${
          open ? "-rotate-45" : ""
        }`}
      />
    </button>
  );
}
