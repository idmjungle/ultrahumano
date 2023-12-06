import Link from "next/link"
import { useRouter } from 'next/router';

export default function PageItem({pst,num,show}) {

    const Router = useRouter()

    console.log(Router)

    let revType = ''
    let link = ''
    let search = ''
  
    switch (pst.acf.review_type) {
        case 'video-juegos':
            revType = 'Video Juegos'
            break;
    
        case 'cine':
          revType = 'Cine'
            break;
    
        case 'tv':
          revType = 'Television'
            break;
    
        case 'comics':
          revType = 'Comics'
            break;
    
        default:
            break;
    }

    switch (pst.acf.page) {
      case "news":
        link = 'noticia'
        search = 'Noticia'
        break;
    
      case 'reviews':
        link = 'resena'
        search = 'Reseña'
        break;
    
      case 'opinion':
        link = 'opinion'
        search = 'Opinion'
        break;
    
      case 'extras':
        link = 'extra'
        search = 'Extra'
        break;
    
      case value:
        
        break;
    
      default:
        break;
    }
  

    return (
          <div id={`num_${num}`} className="col-sm-12 col-md-6 col-lg-3 mb-4">
            <Link href={`/${link}/${pst.id}-${pst.slug}`}>
              <a
                className={`square index ${pst.acf.page} full_rounded d-block ${(show >= num ? 'scale-in-hor-center' : 'start')}`}
                style={{backgroundImage: `url(${pst.x_featured_media_large})`}}
              >
                {pst.acf.page === 'reviews' &&
                <h4 className={`ultra_${pst.acf.page} m-3 p-2 round_cube`}>{revType}</h4>
                }

                {Router.route === '/search' &&
                  <h4 className={`ultra_${pst.acf.page} m-2 p-1`}>{search}</h4>
                }
                <div className={`ultra_${pst.acf.page} m-3 p-2 round_cube`}>
                  <span dangerouslySetInnerHTML={{__html: pst.title.rendered}}></span>
                </div>
              </a>
            </Link>
          </div>
    )
}
