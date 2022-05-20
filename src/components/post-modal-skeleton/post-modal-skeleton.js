import styles from './post-modal-skeleton.module.scss'

const PostModalSkeleton = ({ imageClass }) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.skeleton} ${styles.image_con} ${imageClass}`}></div>
            <div className={`${styles.postDetail_con}`}>
                <div className={styles.user_info}>
                    <div className={`${styles.skeleton} ${styles.circle}`}></div>
                    <div className={styles.info}>
                        <span className={`${styles.skeleton} ${styles.line}`}></span>
                        <span className={`${styles.skeleton} ${styles.line}`}></span>
                    </div>
                </div>
                <div className={styles.content}>
                    <span className={`${styles.skeleton} ${styles.line}`}></span>
                    <span className={`${styles.skeleton} ${styles.line}`}></span>
                    <span className={`${styles.skeleton} ${styles.line}`}></span>
                </div>
            </div>
        </div>
    )
}

export default PostModalSkeleton