export default function ArticleInfo({ author, date }) {

  let d = new Date(date);

  let dateString = [d.toLocaleDateString('es-pr', { day: "numeric", month:"long", year:"numeric"}), d.toLocaleTimeString()];
  const ds = dateString.map((d, i) => (
    <span key={i} className="info_data">
      {" "}
      {d}{" "}
    </span>
  ));

  return (
    <div className="left_sub">
      <span className="info_data">{author} </span>
      {ds}
    </div>
  );


}