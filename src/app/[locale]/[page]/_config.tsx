import dynamic from "next/dynamic";
import type { CanonicalPage } from "@/i18n/routes";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import ServicePage from "@/components/pages/ServicePage";
import ReservationPage from "@/components/pages/ReservationPage";
import InformationPage from "@/components/pages/InformationPage";
import CareerPage from "@/components/pages/CareerPage";

export const LoginPage = dynamic(
  () => import("@/components/pages/LoginPage"),
  { ssr: false, loading: () => <div>Loading…</div> }
);

export const AdminPage = dynamic(
  () => import("@/components/pages/AdminPage"),
  { ssr: false, loading: () => <div>Loading admin…</div> }
);

export type PageComponentProps = {
  dict: any;
  locale: any;
  site: any;
};

export const PageComponentByCanonical: Record<
  CanonicalPage,
  React.ComponentType<PageComponentProps> | null
> = {
  home: HomePage,
  about: AboutPage,
  service: ServicePage as any,
  reservation: ReservationPage,
  information: InformationPage,
  career: CareerPage,
  login: null,
  admin: null,
};
