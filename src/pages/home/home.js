import styles from "./home.module.scss"
import { CreatePost, PostCard } from "@components"
import { useGetAllPostsQuery } from "@api/postApi"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectPostIds } from "@api/postApi"
import { Helmet } from "react-helmet"
const Home = () => {
    const { isLoading, isSuccess, isError, error } = useGetAllPostsQuery()

    const orderedPostIds = useSelector(selectPostIds)


    if (isError) {
        console.log(error)
    }
    return (
        <>
            <Helmet>
                <title>Home | Felix Social</title>
            </Helmet>
            <div className={styles.container}>
                <CreatePost />
                {!isLoading && orderedPostIds.map((id) => {
                    return <PostCard key={id} postId={id} />
                })}
            </div>
        </>
    )
}

export default Home