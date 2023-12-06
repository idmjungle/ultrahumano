import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

let revType = "";
let link = "";

export default function LatestItem({ pst }) {
  switch (pst.acf.review_type) {
    case "video-juegos":
      revType = "Video Juegos";
      break;

    case "cine":
      revType = "Cine";
      break;

    case "tv":
      revType = "Television";
      break;

    case "comics":
      revType = "Comics";
      break;

    default:
      break;
  }

  switch (pst.acf.page) {
    case "news":
      link = "noticia";
      break;

    case "reviews":
      link = "resena";
      break;

    case "opinion":
      link = "opinion";
      break;

    case "extras":
      link = "extra";
      break;

    case value:
      break;

    default:
      break;
  }

  return (
    <div className="col-12 col-sm-6 mb-4">
      <Link href={`/${link}/${pst.id}-${pst.slug}`}>
        <a
          className={`square ${pst.acf.page} d-block full_rounded`}
          // style={{backgroundImage: `url(${pst.x_featured_media_large})`}}
        >          
          <LazyLoadImage
            src={pst.x_featured_media_large}
            effect="blur"
            alt="Image Alt"
            className="full_rounded"
          />
          <h4 className={`ultra_${pst.acf.page} m-2 py-1 px-2 round_cube`}>

            {pst.x_categories.replace("Feature", "").replace(", ", "")}
          </h4>
          <div className={`ultra_${pst.acf.page} m-2 p-2 round_cube bottom`} dangerouslySetInnerHTML={{ __html: pst.title.rendered }}>
          </div>
        </a>
      </Link>
    </div>
  );
}
