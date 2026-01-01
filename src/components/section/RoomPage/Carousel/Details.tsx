import React from "react";
import type { Person } from "./types";
import styles from "./styles.module.css";

export default function Details({ person }: { person: Person | undefined }) {
  if (!person) return null;
  return (
    <div className={styles.details}>
      <h3 className={styles.name}>{person.name}</h3>
      {person.title && <p className={styles.titleSmall}>{person.title}</p>}
      {person.bio && <div className={styles.bio} dangerouslySetInnerHTML={{ __html: person.bio }} />}
    </div>
  );
}
