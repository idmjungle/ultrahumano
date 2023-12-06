import Layout from "@/components/Layout";
import PageItem from "@/components/PageItem";
import Link from "next/link";
import Footer from "@/components/Footer";
import { API_URL } from "@/config/index";
import { useState,useEffect } from "react";

export default function ReviewsPage( {posts} ) {
  
  const [count, setCount] = useState(1)
  
  useEffect(() => {
    const interval = setInterval(() => {
  
      setCount(count + 1)

    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  
  return (
    <Layout title="Extras - Ultrahumano">
      <div className="col-sm-10 vh-100 overflow-auto">
        <div id="index_sub" className="row index_sub mt-2 mb-4">
          <div className="col-sm-12">
            <div className="ultra_extras full_rounded p-3">
              <h2 className="m-0">Extras</h2>
            </div>
          </div>

        </div>
        <div id="index_sq" className="row mt-2">
            {posts.map((pst, i) => (
            <PageItem key={pst.id} pst={pst} num={i} show={count} />
            ))}

        </div>
      <Footer type='extras' />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
    const pres = await fetch(`${API_URL}/wp-json/wp/v2/posts?categories=6&per_page=16&_fields=id,excerpt,title,slug,acf,categories,x_categories,x_featured_media_large`)
    const posts = await pres.json()

  
  
    return {
      props: {posts},
      revalidate: 1
    }
  }