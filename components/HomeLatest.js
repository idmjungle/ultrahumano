import Link from "next/link";
import LatestItem from "./LatestItem";
import Footer from "./Footer";

export default function HomeLatest( {posts} ) {
  return (
    <div className="col-sm-4 vh-100 overflow-auto">
      <div className="row mt-3">

        {posts.map((pst) => (
          <LatestItem key={pst.id} pst={pst} />
        ))}

      </div>
      <Footer />
    </div>
  );
}


