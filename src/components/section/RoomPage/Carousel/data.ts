import type { Group } from "./types";

const base = "/images/information/report/secure";

export const groupData: Group = {
  heading: "Commissioners",
  items: [
    { id: 0, name: "Hendro Sugiatno", title: "Komisaris Utama", bio: "Bio Hendro Sugiatno...", img: `${base}/secure1.webp` },
    { id: 1, name: "M. KHOERUR ROZIQIN", title: "Komisaris", bio: "Bio Roziqin...", img: `${base}/secure2.webp` },
    { id: 2, name: "Eko Suwardi", title: "Komisaris", bio: "Bio Eko Suwardi...", img: `${base}/secure3.webp` },
    { id: 3, name: "Iwan Faidi", title: "Komisaris", bio: "Bio Iwan Faidi...", img: `${base}/secure2.webp` },
    { id: 4, name: "Rimawan Pradiptyo", title: "Komisaris", bio: "Bio Rimawan...", img: `${base}/secure3.webp` },
  ],
};

export default groupData;
