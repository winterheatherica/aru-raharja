"use client";
import { useState, FormEvent } from "react";
import type { Locale, Dictionary } from "@/i18n/getDictionary";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export default function LoginPage({ dict, locale }: { dict?: Dictionary; locale: Locale }) {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null); setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(await res.text().catch(()=>`Login failed ${res.status}`));
      location.href = `/${locale}/${locale === "id" ? "admin" : "admin"}`;
    } catch (e: any) {
      setErr(e.message || "Login gagal");
    } finally {
      setBusy(false);
    }
  }

  const t = {
    title: locale === "id" ? "Masuk" : "Login",
    username: locale === "id" ? "Nama pengguna" : "Username",
    password: locale === "id" ? "Kata sandi" : "Password",
    submit:   locale === "id" ? "Masuk" : "Sign in",
  };

  return (
    <main className="mx-auto max-w-sm p-6 grid gap-3">
      <h1 className="text-2xl font-semibold">{t.title}</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="border rounded p-2" placeholder={t.username}
               value={username} onChange={e=>setU(e.target.value)} autoComplete="username" />
        <input className="border rounded p-2" placeholder={t.password} type="password"
               value={password} onChange={e=>setP(e.target.value)} autoComplete="current-password" />
        <button className="border rounded p-2 disabled:opacity-50" disabled={busy} type="submit">
          {busy ? "..." : t.submit}
        </button>
        {err && <p className="text-red-600 text-sm">{err}</p>}
      </form>
    </main>
  );
}
