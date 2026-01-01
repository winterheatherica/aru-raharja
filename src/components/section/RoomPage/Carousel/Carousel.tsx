"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type Person = {
  id: number;
  name: string;
  title: string;
  img: string;
};

const people: Person[] = [
  { id: 1, name: "Hendro Sugiatno", title: "Komisaris Utama", img: "/images/information/report/secure/secure1.webp" },
  { id: 2, name: "M. Khoerur Roziqin", title: "Komisaris", img: "/images/information/report/secure/secure2.webp" },
  { id: 3, name: "Eko Suwardi", title: "Komisaris", img: "/images/information/report/secure/secure3.webp" },
  { id: 4, name: "Iwan Faidi", title: "Komisaris", img: "/images/information/report/secure/secure2.webp" },
  { id: 5, name: "Rimawan Pradiptyo", title: "Komisaris", img: "/images/information/report/secure/secure3.webp" },
];

export default function Carousel() {
  const [active, setActive] = useState(0);
  const length = people.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setActive((prev) => (prev + 1) % length);
  const prev = () => setActive((prev) => (prev - 1 + length) % length);

  // Auto-play like Jasa Raharja
  useEffect(() => {
    intervalRef.current = setInterval(next, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getVisibleIndexes = () => {
    // always show 5 (two before, one current, two after)
    return [-2, -1, 0, 1, 2].map((offset) => (active + offset + length) % length);
  };

  const visible = getVisibleIndexes();

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Board of Directors <br /> PT Jasa Raharja
        </h1>
      </div>

      <div className={styles.inner}>
        <h3 className={styles.heading}>Commissioners</h3>

        <div className={styles.carousel}>
          {visible.map((index, position) => {
            const person = people[index];
            const offset = position - 2; // -2..+2 relative to center
            const isActive = offset === 0;

            return (
              <div
                key={person.id}
                className={`${styles.card} ${isActive ? styles.active : styles.inactive}`}
                style={{
                  transform: `translateX(${offset * 250}px) scale(${isActive ? 1 : 0.75})`,
                  zIndex: 5 - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                }}
                onClick={() => setActive(index)}
              >
                <div className={styles.imageWrap}>
                  <img src={person.img} alt={person.name} className={styles.image} />
                </div>
              </div>
            );
          })}
          <button className={styles.prev} onClick={prev} aria-label="Prev" />
          <button className={styles.next} onClick={next} aria-label="Next" />
        </div>

        <div className={styles.details}>
          <h4 className={styles.name}>{people[active].name}</h4>
          <p className={styles.role}>{people[active].title}</p>
        </div>
      </div>
    </section>
  );
}
