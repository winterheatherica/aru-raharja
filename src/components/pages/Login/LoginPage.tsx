"use client";
import { useState, FormEvent } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
export const LOGIN_URL = `${API_BASE}/api/auth/login`;

export default function LoginPage({ dict, locale }: { dict?: Dictionary; locale: Locale }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const t = (dict as any)?.login;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (!res.ok) throw new Error(await res.text());
      location.href = `/${locale}/admin/me`;
    } catch (e: any) {
      setErr(e?.message || t?.genericError || (locale === "id" ? "Login gagal" : "Login failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-bumn-gradient-white-4 px-4 py-8 grid place-items-center">
      <section className="w-full max-w-md rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-6 shadow-bumn-2 grid gap-5">
        <header className="grid gap-1">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? (locale === "id" ? "Masuk Admin" : "Admin Login")}</h1>
          <p className="text-sm text-bumnslate-6">{t?.subtitle ?? (locale === "id" ? "Masuk untuk lanjut ke dashboard" : "Sign in to continue to dashboard")}</p>
        </header>

        <form onSubmit={onSubmit} className="grid gap-3">
          <input
            className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-bumnslate-7 outline-none ring-0 transition focus:border-bumnblue-5 focus:shadow-bumn-2"
            placeholder={t?.identifier ?? (locale === "id" ? "Email atau username" : "Email or username")}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
          />
          <input
            className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-bumnslate-7 outline-none ring-0 transition focus:border-bumnblue-5 focus:shadow-bumn-2"
            placeholder={t?.password ?? (locale === "id" ? "Kata sandi" : "Password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={busy}
            type="submit"
          >
            {busy ? (t?.submitting ?? (locale === "id" ? "Sedang masuk..." : "Signing in...")) : (t?.submit ?? (locale === "id" ? "Masuk" : "Sign in"))}
          </button>

          {err && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{err}</p>}
        </form>
      </section>
    </main>
  );
}
