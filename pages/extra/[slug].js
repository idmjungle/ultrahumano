import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useState, useEffect, useMemo } from "react";
import { decode } from "html-entities";
import styles from "@/styles/ListPage.module.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";
import ExtraList from "@/components/ExtraList";

export default function ListPage({ pst }) {
  const router = useRouter();
  const extraType = pst.acf.extra_type;
  let TypeResult = null;

  switch (extraType) {
    case "lista":
      TypeResult = <ExtraList pst={pst} />;
      break;

    default:
      break;
  }

  return (
    <Layout
      title={`Extra - ${decode(pst.title.rendered)} - Ultrahumano`}
      keywords={pst.x_tags}
      description={decode(pst.excerpt.rendered).replace(
        /(<p[^>]+?>|<p>|<\/p>)/gim,
        ""
      )}
      image={pst.x_featured_media_large}
      type="article"
      url={`https://ultrahumano.com${router.asPath}`}
    >
      {TypeResult}
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(
//     `https://data.ultrahumano.com/wordpress/wp-json/wp/v2/posts?_fields=id,slug&filter[posts_per_page]=-1`
//   );
//   const posts = await res.json();

//   const paths = posts.map((pst) => ({
//     params: { slug: pst.id + "-" + pst.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   let slugNum = slug.split("-");
//   slugNum = slugNum[0];

//   const pres = await fetch(`https://data.ultrahumano.com/wordpress/wp-json/wp/v2/posts/${slugNum}`);
//   const post = await pres.json();

//   return {
//     props: {
//       pst: post,
//     },
//     revalidate: 1,
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
