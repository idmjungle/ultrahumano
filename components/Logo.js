import Link from "next/link";

export default function Logo() {
  return (
    <>
      <div className="col-sm-auto d-none d-sm-block ultra_reviews sticky-top logo">
        <Link href="/" passHref>
            <img
              className="main_logo mt-2"
              src="/images/uh_logo_side.svg"
              alt=""
            />
        </Link>
      </div>

    {/* Mobile Version */}

      <div className="d-block d-sm-none">
        <nav className="navbar fixed-top ultra_reviews">
          <div className="container-fluid">
            <span className="mb-0">
                
              <img className="mob_logo" src="/images/uh_20_t_logo.svg" alt="" />
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
