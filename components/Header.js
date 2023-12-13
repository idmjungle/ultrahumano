import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import Menu from "./Menu";
import Search from "./Search";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [open, setOpen] = useState(useState([]));
  const [search, setSearch] = useState(useState([]));

  const changedOpen = (arg) => {
    setOpen(arg);
  };

  const changedSearch = (arg) => {
    setSearch(arg);
  };

  const opening = () => {
    setOpen(1);
  };

  const searchWin = () => {
    setSearch(1);
  };

  const Router = useRouter();

  const page = Router.pathname.split("/");

  return (
    <div>
      <div className="d-block d-sm-none">
        <nav
          className={`navbar fixed-bottom ultra_reviews p-3 ${
            page[1] == "resena" ||
            page[1] == "opinion" ||
            page[1] == "noticia" ||
            page[1] == "extra"
              ? "lift_bottom"
              : ""
          }`}
        >
          <Image
            onClick={opening}
            width={32}
            height={25.23}
            src="/images/uh_20_menu_white.svg"
            alt=""
          />
          <Image
            width={32}
            height={32}
            src="/images/uh_search_white.svg"
            onClick={searchWin}
            alt=""
          />
        </nav>
      </div>

      <Search search={search} changedSearch={changedSearch} />
      <div className="d-none d-sm-block">
        <Image
          id="menu_open"
          onClick={opening}
          width={64}
          height={50}
          className="menu_icon my-3 me-3"
          src="/images/uh_20_menu.svg"
          alt=""
        />
        <Image
          className="menu_icon_bot my-3 me-3"
          width={64}
          height={64}
          src="/images/uh_search_new.svg"
          onClick={searchWin}
          alt=""
        />
      </div>

      <Menu open={open} changedOpen={changedOpen} />
    </div>
  );
}
