"use client";

type MaskingProps = {
  position?: 'absolute' | 'fixed';
};

export default function Masking({ position = 'absolute' }: MaskingProps) {
  return (
    <section
      aria-hidden
      className={`
        hidden md:block
        ${position} top-0 right-0 -z-10 
        w-full h-[200vh]
        bg-no-repeat bg-contain bg-[url('/images/general/masking/masking-variant-3.png')] bg-[top_right]
        drop-shadow-[0_0_3px_#000]
        pointer-events-none select-none
      `}
    />
  );
}
