"use client";

import { usePathname } from "next/navigation";
import ParticleCanvas from "./ParticleCanvas";

type Props = {
  children?: React.ReactNode;
};

export default function Background({ children }: Props) {
  const pathname = usePathname() ?? "";
  const segments = pathname.split("/").filter(Boolean);
  const isAdminPage = (segments[1] ?? "") === "admin";
  const isLoginPage = (segments[1] ?? "") === "login";

  if (isAdminPage || isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="app-background">
      <ParticleCanvas />
      <div className="app-background-content">{children}</div>
    </div>
  );
}
