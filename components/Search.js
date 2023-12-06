import  { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Search.module.css";
import Image from "next/image";

export default function Search({ search, changedSearch }) {
  const [term, setTerm] = useState("");
  const inputElement = useRef(null);
  const router = useRouter();

  const handleSubmit = (e) => {
      e.preventDefault()
      router.push(`/search?term=${term}`)
      changedSearch(0)
      setTerm('')
  }

  useEffect(() => {
    if (search == 1) {
      inputElement.current.focus();
    }
  }, [search]);

  return (
    <div
      className={`${styles.search_win} position-relative ${
        search == 1 ? "" : "d-none"
      }`}
    >
      <div
        className={`${styles.search_main} position-absolute w-100 vh-100 d-flex align-items-center justify-content-center`}
      >
        <form className={styles.search_form} onSubmit={handleSubmit}>
          <div className="input-group">
            <input ref={inputElement} type="text" className={`${styles.search_inp} ultra_news form-control`} value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Escribe aqui..." aria-label="Recipient's username with two button addons" />
            <button className={`${styles.search_but} btn ultra_reviews`} type="submit">Buscar</button>
            <button className={`${styles.search_but_close} btn ultra_extras`} type="button"
              onClick={() => changedSearch(0)}
            >
              <Image src="/images/uh_close_search.svg" alt="" width={35} height={35} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
