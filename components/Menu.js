import Link from "next/link";
import { useRouter } from "next/router";

export default function Menu({ open, changedOpen }) {

  const Router = useRouter();

  const page = Router.pathname.split("/");


  return (
    <div
      id="menu"
      className="main_menu vh-100"
      style={open == 1 ? { left: "0px" } : {}}
    >
      <div
        className={`close_menu ${open == 1 && "show"}`}
        style={{ animationDelay: "500ms" }}
        onClick={() => changedOpen(0)}
      >
        <img className="no_mobile" src="/images/uh_close_new.svg" alt="" />
      </div>

      <ul className={`${
            page[1] == "resena" ||
            page[1] == "opinion" ||
            page[1] == "noticia" ||
            page[1] == "extra"
              ? "menu_jump"
              : ""
          }`}>
        <li
          className={`ultra_news ${open == 1 && "menu_see"}`}
          style={{ animationDelay: "200ms" }}
        >
          <Link href="/noticias"
            className="ultra_news ps-3 d-block text-decoration-none"
            onClick={() => changedOpen(0)}
          >
              Noticias
          </Link>
        </li>
        <li
          className={`ultra_reviews ${open == 1 && "menu_see"}`}
          style={{ animationDelay: "300ms" }}
        >
          <Link href="/resenas"
          className="ultra_reviews ps-3 d-block text-decoration-none"
          onClick={() => changedOpen(0)}
          
          >
              Rese&ntilde;as
          </Link>
        </li>
        <li
          className={`ultra_opinion ${open == 1 && "menu_see"}`}
          style={{ animationDelay: "400ms" }}

        >
          <Link href="/opiniones"
            className="ultra_opinion ps-3 d-block text-decoration-none"
            onClick={() => changedOpen(0)}
          
          >
              Opiniones
          </Link>
        </li>
        <li
          className={`ultra_extras ${open == 1 && "menu_see"}`}
          style={{ animationDelay: "500ms" }}
        >
          <Link href="/extras"
            className="ultra_extras ps-3 d-block text-decoration-none"
            onClick={() => changedOpen(0)}
          >
              Extras
          </Link>
        </li>
      </ul>
      <div
        className={`close_menu_xs p-2 ms-2 mb-2 ultra_reviews ${
          open == 1 && "d-block d-md-none"
        } ${
            page[1] == "resena" ||
            page[1] == "opinion" ||
            page[1] == "noticia" ||
            page[1] == "extra"
              ? "close_jump"
              : ""
          }`}
        onClick={() => changedOpen(0)}
      >
        <img src="/images/uh_close_search.svg" />
      </div>
    </div>
  );
}
