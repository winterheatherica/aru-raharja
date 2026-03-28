"use client";

import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
export const ME_URL = `${API_BASE}/api/me`;

type MeItem = {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  role: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export default function MePage({ dict, locale }: { dict?: Dictionary; locale: Locale }) {
  const [me, setMe] = useState<MeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const t = (dict as any)?.admin?.me;

  async function loadMe() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ME_URL, { credentials: "include" });
      if (!res.ok) {
        setMe(null);
        return;
      }
      const data = await res.json();
      setMe(data);
      setEmail(data?.email || "");
      setUsername(data?.username || "");
      setFullName(data?.full_name || "");
    } catch (e: any) {
      setError(e?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMe();
  }, []);

  async function onSave() {
    setSaving(true);
    setError(null);
    try {
      const payload: any = { email, username, full_name: fullName };
      if (password.trim()) payload.password = password.trim();

      const res = await fetch(ME_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      setEditing(false);
      setPassword("");
      await loadMe();
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="mx-auto max-w-3xl p-6 md:pl-72"><p>{t?.loading ?? "Loading..."}</p></main>;

  if (!me) {
    const loginSlug = "login";
    return (
      <main className="mx-auto max-w-lg p-6">
        <p className="mb-2">{t?.notSignedIn ?? (locale === "id" ? "Anda belum masuk." : "You are not signed in.")}</p>
        <a className="underline" href={`/${locale}/${loginSlug}`}>
          {t?.goToLogin ?? (locale === "id" ? "Ke halaman masuk" : "Go to login")}
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • Me"}</h1>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95"
            onClick={() => {
              if (editing) {
                setEditing(false);
                setEmail(me.email || "");
                setUsername(me.username || "");
                setFullName(me.full_name || "");
                setPassword("");
              } else {
                setEditing(true);
              }
            }}
          >
            {editing ? (t?.buttons?.cancel ?? "Cancel") : (t?.buttons?.edit ?? "Edit")}
          </button>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <section className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 disabled:bg-bumnslate-2" type="email" value={email} disabled={!editing} onChange={(e) => setEmail(e.target.value)} placeholder={t?.fields?.email ?? "Email"} />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 disabled:bg-bumnslate-2" value={username} disabled={!editing} onChange={(e) => setUsername(e.target.value)} placeholder={t?.fields?.username ?? "Username"} />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 disabled:bg-bumnslate-2" value={fullName} disabled={!editing} onChange={(e) => setFullName(e.target.value)} placeholder={t?.fields?.name ?? "Full Name"} />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 disabled:bg-bumnslate-2" type="password" value={password} disabled={!editing} onChange={(e) => setPassword(e.target.value)} placeholder={t?.fields?.password ?? "Password (optional)"} />

        <div className="rounded-xl border border-bumnslate-10 bg-white p-3 text-sm text-bumnslate-6 grid gap-1">
          <p><span className="font-medium">{t?.fields?.role ?? "Role"}:</span> {me.role || "-"}</p>
          <p><span className="font-medium">{t?.fields?.active ?? "Active"}:</span> {String(me.is_active ?? false)}</p>
          <p><span className="font-medium">{t?.fields?.createdAt ?? "Created"}:</span> {me.created_at ? new Date(me.created_at).toLocaleString() : "-"}</p>
          <p><span className="font-medium">{t?.fields?.updatedAt ?? "Updated"}:</span> {me.updated_at ? new Date(me.updated_at).toLocaleString() : "-"}</p>
        </div>

        {editing && (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95"
          >
            {saving ? (t?.buttons?.saving ?? "Saving...") : (t?.buttons?.save ?? "Save")}
          </button>
        )}
      </section>
    </main>
  );
}
