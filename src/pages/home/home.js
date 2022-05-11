import styles from "./home.module.scss"
import { CreatePost, PostCard } from "@components"

const Home = () => {
    return (
        <div className={styles.container}>
            <CreatePost />
            <PostCard />
        </div>
    )
}

export default Home