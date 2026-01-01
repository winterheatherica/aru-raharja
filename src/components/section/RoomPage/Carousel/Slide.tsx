import React from "react";
import type { Person } from "./types";
import styles from "./styles.module.css";

/**
 * Generic slide (thumbnail). isActive controls visual.
 */
export default function Slide({
  person,
  isActive,
  onClick,
}: {
  person: Person;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={styles.card + " " + (isActive ? styles.activeCard : styles.inactiveCard)}
      role="button"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
    >
      <div className={styles.imageWrap}>
        <img src={person.img} alt={person.name} className={styles.img} />
        <div className={styles.overlay} />
      </div>
    </div>
  );
}
