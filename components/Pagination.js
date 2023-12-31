import Link from "next/link";
import { PER_PAGE } from "@/config/index";

export default function Pagination({page, total}) {
  const lastPage = Math.ceil(total / PER_PAGE)

  return (
    <>
      {page > 1 && (
        <Link href={`/resenas?page=${page - 1}`}
        className='btn btn-secondary ultra_reviews full_rounded ultra_btn'
        >
        Previo
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/resenas?page=${page + 1}`} className='btn btn-secondary ultra_reviews full_rounded ultra_btn'>
          Proximo
        </Link>
      )}

    </>
  )
}
