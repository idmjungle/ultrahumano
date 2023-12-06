import Link from "next/link"

export default function Menu({open,changedOpen}) {

    return (
        <div id="menu" className="main_menu vh-100" style={(open == 1) ? {left: '0px'} : {}}>
            <div className={`close_menu ${(open == 1) && 'show'}`} style={{animationDelay: '500ms'}} onClick={() => changedOpen(0)}><img src="/images/uh_close_new.svg" alt="" /></div>
            
            <ul>
                <li className={`ultra_news ${(open == 1) && 'menu_see'}`} style={{animationDelay: '200ms'}}><Link href='/noticias'><a className="ultra_news ps-3 d-block text-decoration-none" onClick={() => changedOpen(0)}>Noticias</a></Link></li>
                <li className={`ultra_reviews ${(open == 1) && 'menu_see'}`} style={{animationDelay: '300ms'}}><Link href='/resenas'><a className="ultra_reviews ps-3 d-block text-decoration-none" onClick={() => changedOpen(0)}>Rese&ntilde;as</a></Link></li>
                <li className={`ultra_opinion ${(open == 1) && 'menu_see'}`} style={{animationDelay: '400ms'}}><Link href='/opiniones'><a className="ultra_opinion ps-3 d-block text-decoration-none" onClick={() => changedOpen(0)}>Opiniones</a></Link></li>
                <li className={`ultra_extras ${(open == 1) && 'menu_see'}`} style={{animationDelay: '500ms'}}><Link href='/extras'><a className="ultra_extras ps-3 d-block text-decoration-none" onClick={() => changedOpen(0)}>Extras</a></Link></li>
            </ul>
        </div>
    )
}
