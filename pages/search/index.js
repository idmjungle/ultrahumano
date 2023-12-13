import Layout from "@/components/Layout";
import PageItem from "@/components/PageItem";
import Link from "next/link";
import Footer from "@/components/Footer";
import { API_URL } from "@/config/index";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SearchPage({ posts }) {
  const Router = useRouter();

  let searchName = Router.query.term;

  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <Layout title={`Resultados de ${searchName}`}>
      <div
        id="column_info"
        className="col-sm-4 left_small vh-100 overflow-auto column_morph"
      >
        <div className="ultra_light full_rounded py-2 px-3 mt-3 top_left">
          Busqueda
        </div>
        <div className="ultra_light full_rounded py-2 px-3 mt-3 top_left">
          {posts.length > 1
            ? posts.length + " Resultados"
            : "Solo un Resultado"}{" "}
          con {searchName}
        </div>
      </div>
      <div className="col-sm-6">
        <div id="index_sq" className="row mt-2">
          {posts.map((pst, i) => (
            <PageItem key={pst.id} pst={pst} num={i} show={count} />
          ))}
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const pres = await fetch(
    `${API_URL}/wp-json/wp/v2/posts?search=${term}&per_page=16&_fields=id,excerpt,title,slug,acf,categories,x_categories,x_featured_media_large`
  );
  const posts = await pres.json();

  return {
    props: { posts },
  };
}
