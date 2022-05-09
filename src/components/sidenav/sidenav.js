import styles from "./sidenav.module.scss"
import { Avatar, IconButton, List, ListItem } from "react-felix-ui"
import useDarkMode from "use-dark-mode";
import {
    HiOutlineSun,
    FiMoon,
    FiHome,
    FiSearch,
    BiBell,
    BiMessageAltDetail,
    RiUser6Line,
    RiSettingsLine,
    FiEdit3,
    AiFillGithub,
    AiFillTwitterCircle,
    IoLogoLinkedin,
    HiMail,
} from "@icons"
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "@assets/svg/felix.svg"

const Sidenav = () => {
    const darkMode = useDarkMode();

    const handleActiveNav = (navigationData) => {
        return navigationData.isActive ? styles.active : ""
    }

    return (
        <aside className={styles.container}>

            <NavLink to="/" className={styles.logo}><Logo /></NavLink>
            <div className={styles.wrapper}>

                <div className={styles.profile_con}>
                    <div className={styles.profile}>
                        <div className={styles.avatar_con}>
                            <IconButton
                                className={styles.actions}
                                icon={darkMode.value ? <HiOutlineSun /> : <FiMoon />}
                                ariaLabel="theme changer button"
                                onClick={darkMode.toggle}
                            />
                            <Avatar name="Animesh garai" size="lg" status="green" className={styles.avatar} />
                            <IconButton
                                className={styles.actions}
                                icon={<FiEdit3 />}
                                ariaLabel="theme changer button"
                                onClick={darkMode.toggle}
                            />
                        </div>
                        <span className={styles.name}>Animesh Garai</span>
                        <span className={styles.username}>@animeshgarai09</span>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.info}>
                            <span>Followers</span>
                            <span>200</span>
                        </div>
                        <div className={styles.info}>
                            <span>Following</span>
                            <span>147</span>
                        </div>
                    </div>
                </div>

                <nav className={styles.nav_con}>
                    <List style="none">
                        <ListItem>
                            <NavLink className={(navigationData) => handleActiveNav(navigationData) + " " + styles.nav_link} to="/home"><FiHome /> Home</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className={(navigationData) => handleActiveNav(navigationData) + " " + styles.nav_link} to="/explore"><FiSearch /> Explore</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className={(navigationData) => handleActiveNav(navigationData) + " " + styles.nav_link} to="/notifications"><BiBell /> Notifications</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className={(navigationData) => handleActiveNav(navigationData) + " " + styles.nav_link} to="/messages"><BiMessageAltDetail />Messages</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className={(navigationData) => handleActiveNav(navigationData) + " " + styles.nav_link} to="/profile"><RiUser6Line /> Profile</NavLink>
                        </ListItem>

                        <ListItem>
                            <NavLink className={(navigationData) => handleActiveNav(navigationData) + " " + styles.nav_link} to="/settings"><RiSettingsLine /> Settings</NavLink>
                        </ListItem>
                    </List>
                </nav>
            </div>
            <div className={styles.social_icon}>
                <IconButton icon={<AiFillGithub />} className={styles.icon} />
                <IconButton icon={<AiFillTwitterCircle />} className={styles.icon} />
                <IconButton icon={<IoLogoLinkedin />} className={styles.icon} />
                <IconButton icon={<HiMail />} className={styles.icon} />
            </div>
        </aside>
    )
}

export default Sidenav