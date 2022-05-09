import styles from "./layout1.module.scss"
import Sidenav from "../sidenav/sidenav"

import { Outlet } from "react-router-dom"
const Layout1 = () => {
    return (
        <div className={styles.container}>
            <Sidenav />
            <Outlet />
        </div>
    )
}

export default Layout1