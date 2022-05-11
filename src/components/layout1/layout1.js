import styles from "./layout1.module.scss"
import Sidenav from "../sidenav/sidenav"
import RightPanel from "../right-panel/right-panel"
import { Outlet } from "react-router-dom"

const Layout1 = () => {
    return (
        <div className={styles.container}>
            <Sidenav />
            <Outlet />
            <RightPanel />
        </div>
    )
}

export default Layout1