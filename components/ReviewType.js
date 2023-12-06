export default function ReviewType({ extra }) {
  let revType = "";
  let Info = extra;

  switch (Info.review_type) {
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

  return (
    <div
      id="sub_title"
      className="ultra_reviews full_rounded py-2 px-3 mt-3 top_left"
    >
      Rese&ntilde;as / {revType}
    </div>
  );
}
