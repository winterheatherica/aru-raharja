import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import UserListPage from "./UserPage/UserListPage";

export default function UserPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  return <UserListPage locale={locale} dict={dict} />;
}
