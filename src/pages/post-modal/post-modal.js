import styles from './post-modal.module.scss'
import { Modal, ModalBody, Avatar, Menu, MenuButton, MenuItem, MenuList, AvatarGroup, useToast, IconButton } from 'react-felix-ui'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart, MdBookmarkBorder, RiShareForwardLine, BiPaperPlane, BiMessageSquareDetail, MdBookmark, BiDotsVerticalRounded } from "@icons"
import { ImageViewer, EmojiPicker, PostModalSkeleton } from '@components'
import { useGetPostQuery, useDeletePostMutation, useLikePostMutation, useDisLikePostMutation } from '@api/postApi'
import dayjs, { dayjsCalender } from "@global/js/day"
import useInputHandler from "@hooks/useInputHandler"
import { useDispatch, useSelector } from 'react-redux'
import { selectUserForReaction, selectBookmarks } from "@slices/authSlice"
import { useMemo, useState, useEffect } from 'react'
import { useBookmarkPostMutation, useRemovePostBookmarkMutation } from "@api/userApi"
import { useAddCommentToPostMutation } from "@api/commentApi"
import { selectReactionState, setReactionState } from '@slices/globalSlice'
import CommentCard from './comment-card'
import { v4 as uuid } from "uuid";

const PostModal = () => {

    const [isMounted, setMount] = useState(false)

    const { postId } = useParams()
    const location = useLocation()
    const toast = useToast()
    // state
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen] = useSelector(selectReactionState)
    const { data: postData, isLoading } = useGetPostQuery(postId)
    const date = dayjsCalender(postData?.createdAt)

    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
    const [likePost] = useLikePostMutation()
    const [disLikePost] = useDisLikePostMutation()
    const [addToBookmark] = useBookmarkPostMutation()
    const [removeFromBookmark] = useRemovePostBookmarkMutation()
    const [addComment] = useAddCommentToPostMutation()

    const userDetails = useSelector(selectUserForReaction)
    const bookmarks = useSelector(selectBookmarks)
    const { username } = userDetails

    const isLiked = useMemo(() => {
        return postData && postData.likes.likedBy.some((user) => {
            return user.username === username
        })
    }, [postData])

    const isBookmarked = useMemo(() => {
        return bookmarks && bookmarks.some((id) => id === postData?._id)
    }, [bookmarks, postData])



    const { inputState, inputChange, setInputState } = useInputHandler({
        comment: ""
    })

    const handleAddComment = () => {
        addComment({
            id: postData._id,
            commentData: {
                _id: uuid(),
                text: inputState.comment,
                profileImg: userDetails.profileImg,
                username: userDetails.username,
                name: userDetails.name,
                likes: { likedBy: [] }
            }
        })
        setInputState({
            comment: ""
        })
    }
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

    const handleEditPost = () => {
        navigate(`/edit-post/${postData._id}`, { state: { background: location.state.background } })
    }

    const handleDeletePost = async () => {
        try {
            await deletePost(postData._id).unwrap()
            toast({
                status: "success",
                message: "Post is deleted !"
            })
            navigate(-1)
        } catch (err) {
            console.log(err)
            toast({
                status: "error",
                message: "Something went wrong"
            })
        }
    }

    const handleOnClose = () => {
        if (location.state) {
            navigate(-1)
        } else {
            navigate('/home')
        }
    }
    useEffect(() => {
        setMount(true)
    }, [])
    return !isMounted ? null : (
        <Modal
            isOpen={true}
            onClose={handleOnClose}
            size="2xl"
            closeOnOverlayClick={!isOpen}
            headerClassName={styles.header}
            overlayClassName={styles.modal}
        >
            <ModalBody className={styles.container}>

                {isLoading
                    ? <PostModalSkeleton />
                    : <>
                        <ImageViewer images={postData.images} className={styles.image_con} />
                        <div className={styles.postDetail_con}>
                            <div className={styles.user_info}>
                                <Avatar size="md" src={postData.profileImg} name={postData.name} className={styles.avatar} />
                                <div className={styles.info}>
                                    <span>
                                        <Link to={`/profile/${postData.username}`} className={styles.name}>{postData.name}</Link>
                                    </span>
                                    <span className={styles.time}>{date}</span>
                                </div>
                                <Menu menuPlacement="bottom-end">
                                    <MenuButton as="IconButton" icon={<BiDotsVerticalRounded />} className={styles.options} />
                                    <MenuList className={styles.list}>
                                        {username === postData.username ? <MenuItem onClick={handleEditPost}>Edit Post</MenuItem> : <></>}
                                        {username === postData.username ? <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem> : <></>}
                                        <MenuItem>Report</MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>


                            <div className={styles.comments}>
                                <div className={styles.con}>

                                    {postData.content && <p>{postData.content}</p>}
                                    {
                                        postData.comments.map((comment => {
                                            const isUser = comment.username === userDetails.username
                                            return <CommentCard comment={comment} isUser={isUser} postId={postData._id} />
                                        }))
                                    }

                                </div>
                            </div>
                            <div className={styles.actions}>
                                <div className={styles.react}>
                                    <IconButton
                                        icon={isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                                        onClick={handleReaction}
                                        className={`${styles.icon} ${isLiked && styles.red}`}
                                    />
                                    <div className={styles.reactions} onClick={() => dispatch(setReactionState(postData.likes.likedBy))}>
                                        {postData.likes.likedBy.length !== 0
                                            && <AvatarGroup size='sm' show={4} max={postData.likes.likedBy.length > 4 && postData.likes.likedBy.length - 4} className={styles.avatar_group}>
                                                {
                                                    postData.likes.likedBy.slice(0, 5).map((item) => {
                                                        return <Avatar src={item.profileImg} name={item.name} />
                                                    })
                                                }
                                            </AvatarGroup>
                                        }
                                    </div>
                                </div>
                                <div className={styles.options}>
                                    <IconButton
                                        icon={<BiMessageSquareDetail />}
                                        className={styles.icon}
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
                            <div className={styles.comment_box}>
                                <EmojiPicker onEmojiSelect={(dt) => setInputState(prev => ({ ...prev, comment: prev.comment + dt.native }))} />

                                <div className={styles.input_con}>
                                    <textarea name="comment" autoCorrect='off' autoComplete='off' placeholder="Write a comment..." value={inputState.comment} onChange={inputChange} ></textarea>
                                </div>
                                <IconButton
                                    icon={<BiPaperPlane />}
                                    className={styles.commentIcon}
                                    onClick={handleAddComment}
                                />
                            </div>
                        </div>
                    </>}
            </ModalBody>
        </Modal>
    )
}

export default PostModal