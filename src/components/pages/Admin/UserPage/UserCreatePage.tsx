"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_USER_URL, UserPayload, USER_ROLES, UserRole } from "./_shared";

export default function UserCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("MEMBER");

  const t = (dict as any)?.admin?.user?.create;

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: UserPayload = {
        email,
        username,
        full_name: fullName,
        password,
        role,
        active: true,
        email_verified: true,
      };

      const res = await fetch(ADMIN_USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      window.location.href = `/${locale}/admin/user`;
    } catch (e: any) {
      setError(e?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create User"}</h1>
          <Link href={`/${locale}/admin/user`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t?.placeholders?.email ?? "email"} required />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t?.placeholders?.username ?? "username"} required />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={t?.placeholders?.fullName ?? "full_name"} required />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t?.placeholders?.password ?? "password"} required />

        <select className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
          {USER_ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <p className="text-xs text-bumnslate-6">{t?.defaultsHint ?? "Default: active=true, email_verified=true"}</p>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.submitSaving ?? "Saving...") : (t?.submitIdle ?? "Create User")}</button>
      </form>
    </main>
  );
}
