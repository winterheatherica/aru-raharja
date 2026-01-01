import React from "react";
import type { Person } from "./types";
import styles from "./styles.module.css";

/**
 * Center expanded slide
 */
export default function ExpandedSlide({ person }: { person: Person }) {
  return (
    <div className={styles.expandedCard}>
      <div className={styles.imageWrap}>
        <img src={person.img} alt={person.name} className={styles.img} />
        <div className={styles.expandedOverlay} />
      </div>
    </div>
  );
}
