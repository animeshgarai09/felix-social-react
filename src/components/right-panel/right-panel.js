import styles from "./right-panel.module.scss"
import { Avatar, Button } from "react-felix-ui"
import {
    FiSearch,
} from "@icons"
const RightPanel = () => {
    return (
        <div className={styles.container}>
            <div className={styles.search__container}>

                <FiSearch />
                <input type="text" placeholder="Search Users" />
            </div>

            <div className={styles.event_card}>
                <Avatar name="Animesh garai" size="md" className={styles.avatar} />
                <span className={styles.heading}>Dan turns 31 today!</span>
                <p>Send him your best wishes by leaving something on his wall.</p>
                <Button size="sm" variant="ghost">Write Message</Button>
            </div>
            <div className={styles.active_followers}>
                <div className={styles.header}>
                    <span>Active Followers</span>
                </div>
                <div className={styles.followers_con}>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                    <div className={styles.follower_card}>
                        <Avatar name="Animesh garai" size="sm" className={styles.avatar} />
                        <span>Animesh Garai</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightPanel