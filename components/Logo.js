import Link from 'next/link';

export default function Logo() {
    return (
            <div className="col-sm-auto d-none d-sm-block ultra_reviews sticky-top logo">
                <Link href="/">
                    <a>
                    <img className="main_logo mt-2" src="/images/uh_logo_side.svg" alt="" />
                    </a>
                </Link>
            </div>
    )
}
