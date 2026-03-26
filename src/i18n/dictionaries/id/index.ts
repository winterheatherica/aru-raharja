import header from "./general/header";
import footer from "./general/footer";
import home from "./home";
import about from "./about";
import service from "./service";
import information from "./information";
import appeal from "./appeal";
import career from "./career";
import reservation from "./reservation";
import article from "./article";
import admin from "./admin";
import login from "./login";

const id = {
  header,
  footer,
  home,
  about,
  service,
  information,
  appeal,
  career,
  reservation,
  article,
  admin,
  login,
} as const;

export default id;
