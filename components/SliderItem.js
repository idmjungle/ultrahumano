import { useState, useEffect } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router';

export default function SliderItem({sld,col,show}) {

    const column = (col === show) ? 'col-9' : 'col-1'
    const colStr = (col === show) ? '0.6' : '1'
    const colName = (col === show) ? sld.x_categories.replace("Feature","").replace(", ","") : sld.acf.short_title
    const effect = (col === show) && 'flicker-in-1'

    
    let bg = '';
    let text = '';
    let line = '';
    let link = '';

    let revType = ''


    switch (sld.acf.review_type) {
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

    switch (sld.acf.page) {
        case 'news':
            bg = '255, 255, 255'
            text = 'red'
            link = 'noticia'
            line = 'news'
            break;
    
        case 'reviews':
            link = 'resena'
            bg = '176, 0, 0'
            text = 'white'
            line = 'review'
            break;
    
        case 'opinions':
            link = 'opinion'
            bg = '50, 48, 49'
            text = 'mid'
            line = 'opinion'
            break;
    
        case 'extras':
            link = 'extra'
            bg = '140, 140, 140'
            text = 'dark'
            line = 'extra'            
            break;
    
        default:
            break;
    }
    
    return (
        <Link href={`/${link}/${sld.id}-${sld.slug}`}
        className={`${column} ultra_mid slider_item`} style={{backgroundImage: `linear-gradient(rgb(${bg}, ${colStr}), rgb(${bg}, ${colStr})), url(${sld.x_featured_media_large})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}} passHref>
            <div className="slider_info p-2">
            <div className={`title ${text}_text ${effect}`}>
                <div className="top pb-3" dangerouslySetInnerHTML={{__html: sld.title.rendered}}></div>
                <div className={`${line}_line d-none d-sm-block`}></div>
                <span className="left_sub" dangerouslySetInnerHTML={{__html: sld.excerpt.rendered}}></span>
            </div>

            <div className={`info ${text}_text`}>
                <div>{colName}</div>
            </div>
            </div>
        </Link>

    )
}
