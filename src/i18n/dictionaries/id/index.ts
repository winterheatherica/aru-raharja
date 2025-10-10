import header from "./general/header";
import footer from "./general/footer";
import home from "./home";
import about from "./about";
import service from "./service";
import information from "./information";
import appeal from "./appeal";
import career from "./career";

const id = {
  header,
  footer,
  home,
  about,
  service,
  information,
  appeal,
  career
} as const;

export default id;
