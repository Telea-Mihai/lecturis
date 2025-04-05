"use client"

import React, {useState} from "react"
import Styles from "./navBar.module.css"

interface Props {
    onPageChange: (page: number) => void
}

const NavBar = ({onPageChange}:Props) => {
    const [navOpen, setNavOpen] = useState(false);
    return <nav className={Styles.container}>
        <div className={Styles.navBar}>
            <button className={Styles.homeBut} onClick={()=>{
                setNavOpen(!navOpen);
            }}><img src={"logoLarge.png"}/></button>
        <div className={navOpen ? Styles.open : Styles.closed}>
            <div className={Styles.sideBar}>
                <button onClick={()=>{
                    onPageChange(1)
                }}><i className={"fa-solid fa-podium"}/>  Lecture</button>
                <button onClick={()=>{
                    onPageChange(2)
                }}><i className="fa-solid fa-comments"></i>  AI chat</button>
            </div>
        </div>
        </div>
    </nav>
}

export default NavBar;