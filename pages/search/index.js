import Layout from "@/components/Layout";
import PageItem from "@/components/PageItem";
import Link from "next/link";
import Footer from "@/components/Footer";
import { API_URL } from "@/config/index";
import { useState,useEffect } from "react";
import { useRouter } from 'next/router';

export default function SearchPage( {posts} ) {

  const Router = useRouter()

  let searchName =  Router.query.term
  
  const [count, setCount] = useState(1)
  
  useEffect(() => {
    const interval = setInterval(() => {
  
      setCount(count + 1)

    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  
  return (
    <Layout title={`Resultados de ${searchName}`}>
      <div className="col-sm-10 vh-100 overflow-auto">
        <div id="index_sub" className="row index_sub mt-2 mb-4">
          <div className="col-sm-12">
            <div className="ultra_gold p-3">
              <h2 className="m-0">{searchName}</h2>
            </div>
          </div>

        </div>
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

export async function getServerSideProps({query: {term}}) {
    const pres = await fetch(`${API_URL}/wp-json/wp/v2/posts?search=${term}&per_page=16&_fields=id,excerpt,title,slug,acf,categories,x_categories,x_featured_media`)
    const posts = await pres.json()

  
  
    return {
      props: {posts}
    }
  }