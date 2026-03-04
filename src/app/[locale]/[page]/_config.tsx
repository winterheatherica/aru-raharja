import type { CanonicalPage } from "@/i18n/routes";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import ServicePage from "@/components/pages/ServicePage";
import ReservationPage from "@/components/pages/ReservationPage";
import InformationPage from "@/components/pages/InformationPage";
import CareerPage from "@/components/pages/CareerPage";
import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";

import {
  LoginPage,
  AdminPage,
} from "./DynamicPages";

export type PageComponentProps = {
  dict: any;
  locale: any;
  site: any;
  activeSolution?: string;
};

export const PageComponentByCanonical: Record<
  CanonicalPage,
  React.ComponentType<PageComponentProps> | null
> = {
  home: HomePage,
  about: AboutPage,
  service: ServicePage,
  reservation: ReservationPage,
  information: InformationPage,
  career: CareerPage,
  article: ArticlePage,
  room: RoomPage,
  login: null,
  admin: null,
};

export { LoginPage, AdminPage };