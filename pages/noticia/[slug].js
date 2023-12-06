import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Footer from "@/components/Footer";
import NewsComm from "@/components/NewsComm";
import Image from "next/image";
import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";

export default function NewsPage({ pst, com }) {
  const router = useRouter();
  const [pos, setPos] = useState(0);

  const [left, setLeft] = useState("col-sm-6");
  const [right, setRight] = useState("col-sm-4");

  useEffect(() => {
    let winRev = document.getElementById("main_scroll");
    const scrollPos = () => {
      const place = winRev.scrollTop;
      setPos(place);
      if (place > 100) {
        setLeft("col-sm-4 left_small");
        setRight("col-sm-6");
      }
    };

    winRev.addEventListener("scroll", scrollPos);
    return () => {
      winRev.removeEventListener("scroll", scrollPos);
    };
  }, []);

  let reviewText = pst.content.rendered;

  let d = new Date(pst.date);

  let dateString = [d.toLocaleDateString(),d.toLocaleTimeString()];
  const ds = dateString.map((d,i) => <span key={i} className="info_data"> {d} </span>)

  

  reviewText = reviewText.split("<p><!--more--></p>");

  const disqusShortname = "ultrahumano";
  const disqusConfig = {
    url: "https://ultrahumano.com/noticia/" + String(pst.id) + "-" + pst.slug,
    identifier: String(pst.id), // Single post id
    title: decode(pst.title.rendered), // Single post title
  };

  return (
    <Layout
      title={`Noticia - ${decode(pst.title.rendered)} - Ultrahumano`}
      keywords={pst.x_tags}
      description={decode(pst.excerpt.rendered)}
      image={pst.x_featured_media_large}
      type="article"
      url={`https://ultrahumano.com${router.asPath}`}
    >
      <div
        id="column_info"
        className={`${left} min-vh-100 overflow-auto column_morph`}
      >
          <div id="sub_title" className="ultra_news full_rounded py-2 px-3 mt-3 top_left">
            Noticias
          </div>
        <div
          className="my-3 p-3 image_cube"
          style={{
            backgroundImage: `linear-gradient(rgb(255, 255, 255, 0.6), rgb(255, 255, 255, 0.6)), url(${pst.x_featured_media_large})`,
          }}
        >
          <div className="info red_text">
            <h1 dangerouslySetInnerHTML={{ __html: pst.title.rendered }}></h1>
            <div className="news_line"></div>
            <span
              className="left_sub"
              dangerouslySetInnerHTML={{ __html: pst.excerpt.rendered }}
            ></span>
          <div className="left_sub">
            <span className="info_data">{pst.x_author}{" "}</span> {ds}
          </div>
          </div>
        </div>
      </div>
      <div
        id="main_scroll"
        className={`${right} vh-100 overflow-auto gx-2 column_morph`}
      >

        <article
          className="ultra_text review_window mt-3 p-3"
          dangerouslySetInnerHTML={{ __html: pst.content.rendered }}
        ></article>

        <div className="text-end mt-2">
          <Image className="logo_end" src="/images/uh_22_logo.svg" alt="Fin" width={128} height={70.4167} />
        </div>

        <h3 className="ultra_text_rev full_rounded my-3 p-3">
          <b>¿Que pensamos?</b>
        </h3>

        {com.map((c, i) => (
          <NewsComm key={c.id} com={c} col={i} />
        ))}
        <div className="ultra_news news_window_bottom mt-3 p-2">
          <b>¿Que piensas?</b>
        </div>
        <div className="ultra_text p-2 review_window_bottom">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>

        <Footer type="news" />
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
  const cres = await fetch(`${API_URL}/wp-json/wp/v2/comments?post=${slugNum}`);
  const comm = await cres.json();

  return {
    props: {
      pst: post,
      com: comm,
    },
    revalidate: 1,
  };
}
