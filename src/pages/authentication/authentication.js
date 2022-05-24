import { useEffect, useState, useRef } from "react"
import styles from "./authentication.module.scss"
import { useLocation } from 'react-router-dom';
import Signin from "./sub-components/signin";
import Signup from "./sub-components/signup";
import { ReactComponent as Logo } from "@assets/svg/felix.svg"
import { ReactComponent as Lines } from "@assets/svg/lines.svg"
import { List, ListItem, IconButton } from "react-felix-ui";
import { Helmet } from "react-helmet"

import {
    AiFillGithub,
    AiFillTwitterCircle,
    IoLogoLinkedin,
    HiMail,
    AiFillHeart,
} from "@icons"
const Authentication = () => {
    const { pathname } = useLocation()
    const [slider, setSlider] = useState(false);
    const signUpRef = useRef(null)
    const signInRef = useRef(null)

    useEffect(() => {
        if (pathname === "/signup") {
            setSlider(true)
        } else {
            setSlider(false)
        }
    }, [pathname])

    useEffect(() => {

        if (pathname === "/signup") {
            signUpRef?.current?.focus()
        } else {
            signInRef?.current?.focus()
        }
    }, [pathname, signUpRef, signInRef])
    return (
        <section className={styles.container}>
            {
                pathname === "/signup"
                    ? <Helmet>
                        <title>Sign Up| Felix Social</title>
                    </Helmet>
                    : <Helmet>
                        <title>Sign In| Felix Social</title>
                    </Helmet>
            }
            <div className={`${styles.wrapper} ${styles.left}`}>
                <Lines className={styles.lines} />
                <div className={styles.content}>
                    <h1>Share moments</h1>
                    <h1>Connect</h1>
                    <h1>Know the world</h1>
                </div>
                <div className={styles.info}>
                    <List style="none" orientation="horizontal">
                        <ListItem className={styles.social_link}>
                            <IconButton icon={<AiFillGithub />} className={styles.icon} />
                        </ListItem>
                        <ListItem className={styles.social_link}>
                            <IconButton icon={<AiFillTwitterCircle />} className={styles.icon} />
                        </ListItem>
                        <ListItem className={styles.social_link}>
                            <IconButton icon={<IoLogoLinkedin />} className={styles.icon} />
                        </ListItem>
                        <ListItem className={styles.social_link}>
                            <IconButton icon={<HiMail />} className={styles.icon} />
                        </ListItem>
                    </List>
                    <span>Made with <AiFillHeart /> by <a href="https://animesh-designs.vercel.app/"> Animesh Garai</a></span>
                </div>
            </div>
            <div className={styles.logo_container}>
                <Logo className={styles.logo} />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.card_con} style={{ height: `${!slider ? "27rem" : ""}` }}>
                    <div className={`${styles.slider} ${slider ? styles.active : ""}`}>
                        <Signin ref={signUpRef} />
                        <Signup ref={signInRef} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Authentication