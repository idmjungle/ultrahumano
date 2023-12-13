import Layout from "@/components/Layout";
import PageItem from "@/components/PageItem";
import Footer from "@/components/Footer";
import { API_URL, PER_PAGE } from "@/config/index";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";

export default function ReviewsPage({ posts, page, total }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <Layout title="Reseñas - Ultrahumano">
      <div className="col-sm-10 vh-100 overflow-auto">
        <div id="index_sub" className="row index_sub my-3">
          <div className="col-sm-12">
            <div className="ultra_reviews p-3 full_rounded">
              <h2 className="m-0">Reseñas</h2>
            </div>
          </div>
        </div>
        <div id="index_sq" className="row mt-2">
          {posts.map((pst, i) => (
            <PageItem key={pst.id} pst={pst} num={i} show={count} />
          ))}
        </div>
        <Pagination page={page} total={total} />
        <Footer />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const pres = await fetch(
    `${API_URL}/wp-json/wp/v2/posts?categories=4&per_page=${PER_PAGE}&offset=${start}&_fields=id,excerpt,title,slug,acf,categories,x_categories,x_featured_media_large`
  );

  const posts = await pres.json();

  const total = parseFloat(pres.headers.get("X-WP-Total"));

  return {
    props: { posts, page: +page, total },
  };
}
