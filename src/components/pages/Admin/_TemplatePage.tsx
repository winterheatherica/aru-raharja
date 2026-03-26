import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type Props = {
  locale: Locale;
  dict?: Dictionary;
  title: string;
  text: string;
};

export default function TemplatePage({ locale, dict, title, text }: Props) {
  void locale;
  void dict;

  return (
    <main className="mx-auto max-w-3xl p-6 grid gap-4 md:pl-72">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="rounded-lg border p-4 text-sm">{text}</div>
    </main>
  );
}
