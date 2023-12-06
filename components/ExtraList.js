import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { DiscussionEmbed } from "disqus-react";
import { decode } from "html-entities";
import styles from "@/styles/ListPage.module.css";

export default function ExtraList({ pst }) {
  const list = pst.content.rendered;
  const listArray = list.split("<p><!--more--></p>");
  const listIntro = listArray[0];
  const [pos, setPos] = useState(0);

  const prev = () => {
    setPos(pos-1)
    console.log(pos)
    console.log(listTotal)
  }

  const next = () => {
    setPos(pos+1)
    console.log(pos)
    console.log(listTotal)
  }


  let listText = [];
  let listImage = [];
  let listMedia = [''];
  let listNumber = [];

  listImage.push(pst.x_featured_media_large);

  

  listArray.forEach((v,k) => {
    var re = new RegExp("/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i");
    if (k % 2 === 0) {
      listText.push(v);
    } else {
      if (re.test(v)) {
        listImage.push(v);
        listMedia.push('');
      } else {
        listMedia.push(v);
        listImage.push('');
      }
    }

  });

  const listTotal = listText.length;

  let i = 1;

  listText.forEach(element => {
    listNumber.push(i);
    i++;
  });

  listNumber.reverse();

  return (
    <>
      <div
        id="column_info"
        className="col-sm-6 min-vh-100 overflow-auto column_morph"
      >
        <div
          id="sub_title"
          className="ultra_extras full_rounded py-2 px-3 mt-3 top_left"
        >
          Extra / Lista
        </div>

        <div className="my-3 p-3 image_cube"
          style={{
            backgroundImage: `linear-gradient(rgb(140, 140, 140, ${(listImage[pos] == '') ? '1' : '0.6'}), rgb(140, 140, 140, ${(listImage[pos] == '') ? '1' : '0.6'})), url(${listImage[pos]})`,
            backgroundPosition: `center`
          }}
        >
          <div className={`info dark_text ${(pos == 0) ? '' : 'd-none'}`}>
            <h1 dangerouslySetInnerHTML={{ __html: pst.title.rendered }}></h1>
            <div className="extra_line"></div>
          </div>
          <div className={`video_screen ${(pos == 0) ? 'd-none' : 'd-block'}`} dangerouslySetInnerHTML={{ __html: listMedia[pos]}}></div>
        </div>
      </div>

      <div className="col-sm-5 vh-100 overflow-auto gx-2 column_morph">
        <div
          className="container mt-3"
        >
          <div className="row g-0">
            <div onClick={prev} className={`col-1 extra_window_left extra_list_${(pos > 0) ? 'on' : 'off'}`}></div>
            <div className="col-10 extra_window_middle ultra_text ">
              <div className={`list_number ps-3 ms-3 me-3 mt-2 ${(pos == 0) ? 'd-none' : 'd-block'}`}>{listNumber[pos]}</div>
              
              <div className="p-3" dangerouslySetInnerHTML={{ __html: listText[pos] }}></div>
            </div>
            <div onClick={next} className={`col-1 extra_window_right extra_list_${(pos + 1 < listTotal) ? 'on' : 'off'}`}></div>
          </div>


        </div>
      </div>
    </>
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
