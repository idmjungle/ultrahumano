import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Footer from "@/components/Footer";
import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";
import { StickyShareButtons } from "sharethis-reactjs";
import Image from "next/image";
import ReviewScore from "@/components/ReviewScore";
import ArticleInfo from "@/components/ArticleInfo";
import ArticleRelated from "@/components/ArticleRelated";
import ReviewInfo from "@/components/ReviewInfo";
import ReviewType from "@/components/ReviewType";

export default function ReviewPage({ pst, relate }) {
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
        setLeft("col-sm-4 col-md-4 col-lg-4 left_small");
        setRight("col-sm-6 col-md-6 col-lg-6");
      }
    };

    winRev.addEventListener("scroll", scrollPos);
    return () => {
      winRev.removeEventListener("scroll", scrollPos);
    };
  }, []);

  const reviewText = pst.content.rendered.split("<p><!--more--></p>");

  const disqusShortname = "ultrahumano";
  const disqusConfig = {
    url: "https://ultrahumano.com/resena/" + String(pst.id) + "-" + pst.slug,
    identifier: String(pst.id), // Single post id
    title: decode(pst.title.rendered), // Single post title
  };

  return (
    <Layout
      title={`Reseña - ${decode(pst.title.rendered)} - Ultrahumano`}
      keywords={pst.x_tags}
      description={decode(pst.excerpt.rendered)}
      image={pst.x_featured_media_large}
      type="article"
      url={`https://ultrahumano.com${router.asPath}`}
    >
      <div
        id="column_info"
        className={`${left} overflow-auto column_morph mt-3 mt-md-0`}
      >
        <ReviewType extra={pst.acf} />
        <div
          className="my-3 p-3 image_cube"
          style={{
            backgroundImage: `linear-gradient(rgb(176, 0, 0, 0.6), rgb(176, 0, 0, 0.6)), url(${pst.x_featured_media_large})`,
          }}
        >
          <div className="info white_text">
            <h1 dangerouslySetInnerHTML={{ __html: pst.title.rendered }}></h1>
            <div className="review_line"></div>
            <span
              className="left_sub"
              dangerouslySetInnerHTML={{ __html: pst.excerpt.rendered }}
            ></span>
            <ReviewInfo extra={pst.acf} />

            <ArticleInfo author={pst.x_author} date={pst.date} />
          </div>
        </div>
      </div>
      <div
        id="main_scroll"
        className={`${right} vh-100 overflow-auto column_morph`}
      >
        <article>
          <div
            className="ultra_text my-3 p-2 review_window"
            dangerouslySetInnerHTML={{ __html: reviewText[0] }}
          ></div>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1228324154278252"
            data-ad-slot="5048928532"
            data-ad-format="auto"
            data-full-width-responsive="true"
          >
            {" "}
          </ins>{" "}
          <div className="square_top ultra_reviews">Bueno</div>
          <div
            className="ultra_text p-2 mb-3 review_window_bottom"
            dangerouslySetInnerHTML={{ __html: reviewText[1] }}
          ></div>
          <div className="square_top ultra_reviews">Malo</div>
          <div
            className="ultra_text p-2 mb-3 review_window_bottom"
            dangerouslySetInnerHTML={{ __html: reviewText[2] }}
          ></div>
          <div className="square_top ultra_reviews">Final</div>
          <div className="ultra_text p-2 review_window_bottom">
            <div className="row">
              <div className="col-md-5 order-2 order-md-1">
                <ReviewScore num={pst.acf.points} />
              </div>
              <div className="col-md-7 order-1 order-md-2">
                <span
                  dangerouslySetInnerHTML={{ __html: reviewText[3] }}
                ></span>
              </div>
            </div>
          </div>
        </article>
        <div className="text-end mt-3">
          <Image
            className="logo_end"
            src="/images/uh_22_logo.svg"
            alt="Fin"
            width={128}
            height={70.4167}
          />
        </div>

        <ArticleRelated relate={relate} type={'reviews'} />

        <div className="ultra_reviews square_top mt-3 p-2">
          <b>¿Que piensas?</b>
        </div>
        <div className="ultra_text p-2 review_window_bottom">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
        <StickyShareButtons
          config={{
            alignment: "right", // alignment of buttons (left, right)
            color: "social", // set the color of buttons (social, white)
            enabled: true, // show/hide buttons (true, false)
            font_size: 16, // font size for the buttons
            hide_desktop: false, // hide buttons on desktop (true, false)
            labels: "counts", // button labels (cta, counts, null)
            language: "en", // which language to use (see LANGUAGES)
            min_count: 0, // hide react counts less than min_count (INTEGER)
            networks: [
              // which networks to include (see SHARING NETWORKS)
              "facebook",
              "twitter",
              "whatsapp",
              "messenger",
              "sms",
              "email",
            ],
            padding: 12, // padding within buttons (INTEGER)
            radius: 4, // the corner radius on each button (INTEGER)
            show_total: true, // show/hide the total share count (true, false)
            show_mobile: true, // show/hide the buttons on mobile (true, false)
            show_toggle: true, // show/hide the toggle buttons (true, false)
            size: 48, // the size of each button (INTEGER)
            top: 300, // offset in pixels from the top of the page
          }}
        />
        <Footer />
      </div>
    </Layout>
  );
}


// export async function getStaticProps({ params: { slug } }) {
//   let slugNum = slug.split("-");
//   slugNum = slugNum[0];

//   const pres = await fetch(`https://data.ultrahumano.com/wordpress/wp-json/wp/v2/posts/${slugNum}`);
//   const rl = await fetch(`https://data.ultrahumano.com/wordpress/wp-json/contextual-related-posts/v1/posts/${slugNum}`);

//   const post = await pres.json();
//   const relate = await rl.json();

//   return {
//     props: {
//       pst: post,
//       relate: relate
//     },
//     revalidate: 1,
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch(
//     `https://data.ultrahumano.com/wordpress/wp-json/wp/v2/posts?_fields=id,slug&filter[posts_per_page]=-1`
//   );
//   const posts = await res.json();

//   const paths = posts.map((pst) => ({
//     params: { slug: pst.id + "-" + pst.slug },
//   }));

//   return {
//     fallback: true,
//     paths,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  let slugNum = slug.split("-");
  slugNum = slugNum[0];
  const pres = await fetch(`https://data.ultrahumano.com/wordpress/wp-json/wp/v2/posts/${slugNum}`);
  const rl = await fetch(
    `https://data.ultrahumano.com/wordpress/wp-json/contextual-related-posts/v1/posts/${slugNum}`
  );
  const post = await pres.json();
  const relate = await rl.json();

  return {
    props: {
      pst: post,
      relate: relate,
    }
  }
}
