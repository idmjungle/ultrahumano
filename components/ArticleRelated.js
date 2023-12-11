import RelateItem from "./RelateItem";

export default function ArticleRelated({ relate, type }) {
  return (
    <div className={`${(relate.length > 0) ? 'd-block' : 'd-none'}`}>
      <h3 className={`ultra_${type} full_rounded my-3 p-3`}>
        <b>Mas reseñas...</b>
      </h3>
      <div className="row mx-0">
        {relate.map((r, i) => (
          <RelateItem key={r.id} pst={r} num={i} />
        ))}
      </div>
    </div>
  );
}
