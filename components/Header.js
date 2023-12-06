import Link from 'next/link';
import styles from '../styles/Header.module.css'
import Menu from './Menu';
import Search from './Search';
import { useState } from 'react';

export default function Header() {
    const [open,setOpen] = useState(useState([]))
    const [search,setSearch] = useState(useState([]))

    const changedOpen = (arg) => {
        setOpen(arg)

    }
    
    const changedSearch = (arg) => {
        setSearch(arg)

    }
    
    const opening = () => {
        setOpen(1)
    }
    
    const searchWin = () => {
        setSearch(1)
    }

    return (
        <div>
            <Search search={search} changedSearch={changedSearch}/>
            <div className="d-none d-sm-block">
                <img id="menu_open" onClick={opening} style={{width: '64px'}} className="menu_icon my-3 me-3" src="/images/uh_20_menu.svg" alt="" />
                <img className="menu_icon_bot my-3 me-3" style={{width: '64px'}} src="/images/uh_search_new.svg" onClick={searchWin} alt="" />
            </div>

            <div className="d-block d-sm-none">
                <nav className="navbar fixed-top ultra_reviews">
                    <div className="container-fluid">
                        <span className="mb-0">
                            <img className="mob_logo" src="/images/uh_20_t_logo.svg" alt="" />
                        </span>
                    </div>
                </nav>

            </div>
            <Menu open={open} changedOpen={changedOpen} />
        </div>
    )
}
