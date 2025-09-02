"use client";

import { useLayoutEffect } from "react";

export function useLockBody(locked: boolean) {
  useLayoutEffect(() => {
    const { body } = document;
    if (!body) return;

    const prev = body.style.overflow;
    if (locked) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = prev;
    }

    return () => {
      body.style.overflow = prev;
    };
  }, [locked]);
}
