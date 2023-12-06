import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useState, useEffect } from "react";
import { decode } from 'html-entities';
import Footer from "@/components/Footer";
import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function NewsPage({ pst }) {
  const router = useRouter()
  const [pos, setPos] = useState(0);

  const [left, setLeft] = useState('col-sm-6');
  const [right, setRight] = useState('col-sm-4');

  useEffect(() => {
    let winRev = document.getElementById("main_scroll");
    const scrollPos = () => {
      const place = winRev.scrollTop;
      setPos(place);
      if (place > 100) {
        setLeft('col-sm-4 left_small')
        setRight('col-sm-6')
      }
    };

    winRev.addEventListener("scroll", scrollPos);
    return () => {
      winRev.removeEventListener("scroll", scrollPos);
    };
  }, []);

  let reviewText = pst.content.rendered;

  reviewText = reviewText.split("<p><!--more--></p>");

  const disqusShortname = "ultrahumano";
  const disqusConfig = {
    url: "https://ultrahumano.com/opinion/" + String(pst.id) + "-" + pst.slug,
    identifier: String(pst.id), // Single post id
    title: decode(pst.title.rendered), // Single post title
  };

  let d = new Date(pst.date);

  let dateString = [d.toLocaleDateString(), d.toLocaleTimeString()];
  const ds = dateString.map((d, i) => <span key={i} className="ultra_opinion full_rounded px-2 py-1 me-1 mb-2"> {d} </span>)

  return (
    <Layout title={`Opinion - ${decode(pst.title.rendered)} - Ultrahumano`} keywords={pst.x_tags} description={decode(pst.excerpt.rendered)} image={pst.x_featured_media_large} type='article' url={`https://ultrahumano.com${router.asPath}`}>
      <div
        id="column_info"
        className={`${left} min-vh-100 overflow-auto column_morph`}
      >
        <div id="sub_title" className="ultra_opinion full_rounded py-2 px-3 mt-3 top_left">
          Opiniones
        </div>
        <div
          className="my-3 p-3 image_cube"
          style={{
            backgroundImage: `linear-gradient(rgb(50,48,49, 0.8), rgb(50,48,49, 0.8)), url(${pst.x_featured_media_large})`,
          }}
        >
          <div className="info mid_text">
            <h1 dangerouslySetInnerHTML={{ __html: pst.title.rendered }}></h1>
            <span className="left_sub"
              dangerouslySetInnerHTML={{ __html: pst.excerpt.rendered }}
            ></span>
            <div className="opinion_line"></div>

          </div>
        </div>
        <div className="mt-3">
          <div className="left_sub">
            <div className="ultra_opinion full_rounded d-inline-block px-2 py-1 me-1 mb-2">Por: {pst.x_author}</div> {ds}
          </div>
        </div>
      </div>
      <div
        id="main_scroll"
        className={`${right} vh-100 overflow-auto gx-2 column_morph`}
      >
        <div
          className="ultra_text full_rounded my-3 p-3 opinion_window"
          dangerouslySetInnerHTML={{ __html: pst.content.rendered }}
        ></div>

        <p className="text-end">
          <Image 
            className="logo_end" 
            src="/images/uh_22_logo.svg" 
            alt="End of Text" 
            width={128}
            height={78}
          />
        </p>


        <div className="ultra_opinion square_top mt-3 p-2">
          <b>¿Que piensas?</b>
        </div>

        <div className="ultra_text p-2 opinion_window_bottom">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>

        <Footer type='opinion' />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${API_URL}/wp-json/wp/v2/posts?_fields=id,slug&filter[posts_per_page]=-1`
  );
  const posts = await res.json();


  const paths = posts.map((pst) => ({
    params: { slug: pst.id + "-" + pst.slug },
  }));


  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  let slugNum = slug.split("-");
  slugNum = slugNum[0];

  const pres = await fetch(`${API_URL}/wp-json/wp/v2/posts/${slugNum}`);
  const post = await pres.json();

  return {
    props: {
      pst: post,
    },
    revalidate: 1,
  };
}
