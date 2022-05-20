import styles from './post-modal.module.scss'
import { Modal, ModalBody, Avatar, Menu, MenuButton, MenuItem, MenuList, useToast } from 'react-felix-ui'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { BiDotsVerticalRounded } from "@icons"
import { ImageViewer, EmojiPicker, PostModalSkeleton } from '@components'
import { useGetPostQuery, useDeletePostMutation } from '@api/postApi'
import dayjs, { dayjsCalender } from "@global/js/day"
import useInputHandler from "@hooks/useInputHandler"
import { useSelector } from 'react-redux'
import { selectUser } from "@slices/authSlice"

const PostModal = () => {
    const { postId } = useParams()
    const location = useLocation()
    const toast = useToast()
    const state = location.state.background
    // state
    const navigate = useNavigate()
    const { data: postData, isLoading } = useGetPostQuery(postId)
    const date = dayjsCalender(postData?.createdAt)

    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
    const { username } = useSelector(selectUser)

    const { inputState, inputChange, setInputState } = useInputHandler({
        comment: ""
    })

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

    return (
        <Modal
            isOpen={true}
            onClose={() => navigate(-1)}
            size="2xl"
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
                            <div className={styles.content}>
                                {postData.content && <p>{postData.content}</p>}
                            </div>
                            <div className={styles.comments}>
                                <div className={styles.con}>

                                </div>
                            </div>
                            <div className={styles.comment_box}>
                                <EmojiPicker onEmojiSelect={(dt) => setInputState(prev => ({ ...prev, comment: prev.comment + dt.native }))} />
                                <div className={styles.input_con}>
                                    <textarea name="comment" autoCorrect='false' autoComplete='false' placeholder="Write a comment..." value={inputState.comment} onChange={inputChange} ></textarea>
                                </div>
                            </div>
                        </div>
                    </>}
            </ModalBody>
        </Modal>
    )
}

export default PostModal