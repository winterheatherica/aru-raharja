"use client";

import dynamic from "next/dynamic";

export const LoginPage = dynamic(
  () => import("@/components/pages/Login/LoginPage"),
  { ssr: false, loading: () => <div>Loading…</div> }
);

export const AdminPage = dynamic(
  () => import("@/components/pages/Admin/AdminPage"),
  { ssr: false, loading: () => <div>Loading admin…</div> }
);