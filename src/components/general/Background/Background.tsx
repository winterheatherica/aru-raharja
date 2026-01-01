"use client";

import ParticleCanvas from "./ParticleCanvas";

type Props = {
  children?: React.ReactNode;
};

export default function Background({ children }: Props) {
  return (
    <div className="app-background">
      <ParticleCanvas />
      <div className="app-background-content">
        {children}
      </div>
    </div>
  );
}
