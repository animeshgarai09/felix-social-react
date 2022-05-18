import styles from "./sidenav.module.scss"
import { Avatar, IconButton, List, ListItem, Menu, MenuButton, MenuItem, MenuList } from "react-felix-ui"
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
    BiDotsVerticalRounded,
    MdOutlinePrivacyTip,
    FiHelpCircle,
    BiLogOutCircle,
    HiMail,
} from "@icons"
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "@assets/svg/felix.svg"

import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@slices/authSlice";
import { logout } from "@slices/authSlice";
const Sidenav = () => {
    const darkMode = useDarkMode();
    const userDetails = useSelector(selectUser)
    const dispatch = useDispatch()
    const handleActiveNav = (navigationData) => {
        return navigationData.isActive ? styles.active : ""
    }
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <aside className={styles.container}>
            <NavLink to="/" className={styles.logo}><Logo /></NavLink>
            <Menu menuPlacement="right-end" offset={[0, 25]}>
                <MenuButton as="IconButton" icon={<BiDotsVerticalRounded />} className={styles.options} />
                <MenuList className={styles.list}>
                    <MenuItem leftIcon={<MdOutlinePrivacyTip />}>Privacy</MenuItem>
                    <MenuItem leftIcon={<FiHelpCircle />}>Help</MenuItem>
                    <MenuItem onClick={handleLogout} leftIcon={<BiLogOutCircle />}>Log out</MenuItem>
                </MenuList>
            </Menu>
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
                            <Avatar src={userDetails.profileImg ? userDetails.profileImg : ""} name="Animesh garai" size="lg" status="green" className={styles.avatar} />
                            <IconButton
                                className={styles.actions}
                                icon={<FiEdit3 />}
                                ariaLabel="theme changer button"
                                onClick={darkMode.toggle}
                            />
                        </div>
                        <span className={styles.name}>{userDetails.name}</span>
                        <span className={styles.username}>@{userDetails.username}</span>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.info}>
                            <span>Followers</span>
                            <span>{userDetails.followers.ids.length}</span>
                        </div>
                        <div className={styles.info}>
                            <span>Following</span>
                            <span>{userDetails.following.ids.length}</span>
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
                            <NavLink className={(navigationData) => handleActiveNav(navigationData) + " " + styles.nav_link} to={`/profile/${userDetails.username}`}><RiUser6Line /> Profile</NavLink>
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