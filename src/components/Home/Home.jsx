import { MenuLinks } from "./MenuLinks/MenuLinks";
import { SocialApp } from "./SocialApp/SocialApp";
import { Recommended } from "./Recommended/Recommended";
import { Intro } from "./Intro/Intro";
import "./Home.css";

export function Home() {
  return (
    <>
      <MenuLinks />
      <SocialApp />
      <Recommended />
      <Intro />
    </>
  );
}
