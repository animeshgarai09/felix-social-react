import styles from './post-card.module.scss'
import { Avatar, AvatarGroup, IconButton, Menu, MenuButton, MenuItem, MenuList } from 'react-felix-ui'
import ImageViewer from '../image-viewer/image-viewer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart, MdBookmarkBorder, RiShareForwardLine, MdBookmark, BiMessageSquareDetail, BiDotsVerticalRounded } from "@icons"
import { useDispatch, useSelector } from 'react-redux'
import { selectUserForReaction, selectBookmarks } from "@slices/authSlice"
import { setReactionState } from '@slices/globalSlice'
import { selectPostById } from '@api/postApi'
import { dayjsCalender } from "@global/js/day"
import React, { useMemo } from 'react'
import { useLikePostMutation, useDisLikePostMutation, } from "@api/postApi"
import { useBookmarkPostMutation, useRemovePostBookmarkMutation } from "@api/userApi"

const PostCard = ({ postId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const postData = useSelector(state => selectPostById(state, postId))
    const userDetails = useSelector(selectUserForReaction)
    const bookmarks = useSelector(selectBookmarks)
    const dispatch = useDispatch()
    const { username } = userDetails
    const date = dayjsCalender(postData.createdAt)

    const isLiked = useMemo(() => {
        return postData && postData.likes.likedBy.some((user) => {
            return user.username === username
        })
    }, [postData])

    const isBookmarked = useMemo(() => {
        return bookmarks.some((id) => id === postData._id)
    }, [bookmarks])

    const [likePost] = useLikePostMutation()
    const [disLikePost] = useDisLikePostMutation()
    const [addToBookmark] = useBookmarkPostMutation()
    const [removeFromBookmark] = useRemovePostBookmarkMutation()

    const handleReaction = () => {
        if (isLiked) {
            disLikePost({ id: postData._id, userDetails })
        } else {
            likePost({ id: postData._id, userDetails })
        }
    }

    const handleBookmark = () => {
        if (isBookmarked) {
            removeFromBookmark(postData._id)
        } else {
            addToBookmark(postData._id)
        }
    }
    const handleNavigatePost = () => {
        navigate(`/post/${postData._id}`, { state: { background: location } })
    }

    const renderLikedStatus = () => {

        if (postData.likes.likeCount === 0) {
            return postData.comments.length === 0 ? <span>Be the first to like and comment</span> : <span>Be the first to like the post</span>
        } else if (postData.likes.likeCount === 1) {
            if (isLiked) {
                return <span>You liked this post</span>
            } else {
                return <span><span>{postData.likes.likedBy[0].name}</span> liked this post</span>
            }
        } else if (postData.likes.likeCount > 1) {
            if (isLiked && postData.likes.likeCount === 2) {
                const temp = postData.likes.likedBy.filter((user) => user._id !== userDetails._id)
                return <span>You and <span>{temp[0].name} </span> liked this post</span>
            } else {
                return <span><span>{postData.likes.likedBy[0]}</span> and {postData.likes.likeCount - 1} others liked this post</span>
            }
        } else {

        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Avatar size="md" src={postData.profileImg} name={postData.name} className={styles.avatar} />
                <div className={styles.info}>
                    <span>
                        <Link to={`/profile/${postData.username}`} className={styles.name}>{postData.name}</Link>
                        <Link to={`/profile/${postData.username}`} className={styles.username}>@{postData.username}</Link>
                    </span>
                    <span className={styles.time}>{date}</span>
                </div>
                <Menu menuPlacement="bottom-end">
                    <MenuButton as="IconButton" icon={<BiDotsVerticalRounded />} className={styles.options} />
                    <MenuList className={styles.list}>
                        {username === postData.username ? <MenuItem onClick={() => navigate(`/edit-post/${postData._id}`, { state: { background: location } })}>Edit Post</MenuItem> : <></>}
                        <MenuItem onClick={handleNavigatePost} >Go to post</MenuItem>
                        <MenuItem>Report</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className={styles.caption}>
                {postData.content && <p>{postData.content}</p>}
            </div>
            <ImageViewer images={postData.images} className={styles.image_container} />
            <div className={styles.actions}>
                <div className={styles.react}>
                    <IconButton
                        icon={isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                        onClick={handleReaction}
                        className={`${styles.icon} ${isLiked && styles.red}`}
                    />
                    <div className={styles.reactions} onClick={() => dispatch(setReactionState(postData.likes.likedBy))}>
                        {postData.likes.likedBy.length !== 0
                            && <AvatarGroup size='sm' show={5} max={postData.likes.likedBy.length > 5 && postData.likes.likedBy.length - 5} className={styles.avatar_group}>
                                {
                                    postData.likes.likedBy.slice(0, 5).map((item) => {
                                        return <Avatar key={item._id} src={item.profileImg} name={item.name} />
                                    })
                                }
                            </AvatarGroup>
                        }
                    </div>
                    <div className={styles.info}>
                        {renderLikedStatus()}
                    </div>
                </div>
                <div className={styles.options}>
                    {postData.comments.length !== 0 &&
                        <Link
                            to={`/post/${postData._id}`}
                            state={{ background: location }}>
                            {postData.comments.length} comments
                        </Link>}
                    <IconButton
                        icon={<BiMessageSquareDetail />}
                        className={styles.icon}
                        onClick={handleNavigatePost}
                    />
                    <IconButton
                        icon={isBookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
                        className={styles.icon}
                        onClick={handleBookmark}
                    />
                    <IconButton
                        icon={<RiShareForwardLine />}
                        className={styles.icon}
                    />
                </div>
            </div>
        </div>
    )
}

export default PostCard