export default function ReviewInfo({ extra }) {
  let revData = "";
  let Info = extra;

  switch (Info.review_type) {
    case "video-juegos":
      revData = [Info.year, Info.review_genre];
      break;

    case "cine":
      revData = [
        Info.year,
        Info.review_genre,
        Info.movie_studio,
        Info.movie_director,
      ];
      break;

    case "tv":
      revData = [
        Info.year,
        Info.review_genre,
        Info.tv_creator,
        Info.tv_network,
        Info.tv_origin,
      ];
      break;

    case "comics":
      revData = [Info.year, Info.review_genre];
      break;

    default:
      break;
  }

  const rd = revData.map((r, i) => (
    <span key={i} className="info_data">
      {" "}
      {r}{" "}
    </span>
  ));

  return (
    <div className="left_sub mb-2">{rd}</div>
  );


}
