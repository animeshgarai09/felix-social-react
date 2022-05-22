import styles from "./write-post.module.scss"
import { Avatar, Button, Menu, MenuButton, MenuList, MenuItem, useToast } from "react-felix-ui"
import { BiPaperPlane, BsArrowLeftShort, HiOutlineGlobe } from "@icons"
import ImageViewer from "../image-viewer/image-viewer"
import EmojiPicker from "../emoji-picker/emoji-picker"
import { useCreatePostMutation, useUpdatePostMutation } from "@api/postApi"
import useInputHandler from "@hooks/useInputHandler"
import { useSelector } from 'react-redux'
import { selectUser } from "@slices/authSlice"

const WritePost = ({ images, data, isSubmit, onBack, onClose }) => {
    const [createPost, {
        isLoading: createPostLoading,
    }] = useCreatePostMutation()
    const [updatePost, {
        isLoading: updatePostLoading
    }] = useUpdatePostMutation()

    const toast = useToast()
    const { inputState, inputChange, setInputState } = useInputHandler({
        content: data?.content
    })

    const userDetails = useSelector(selectUser)


    const handleSubmit = async () => {
        const postData = {
            ...inputState, images, profileImg: userDetails.profileImg
        }
        if (isSubmit) {
            try {
                await createPost(postData).unwrap()
                toast({
                    status: "success",
                    message: "Post is shared"
                })
                onClose()
            }
            catch (err) {
                console.log(err)
                toast({
                    status: "error",
                    message: "Something went wrong"
                })
            }
        } else {
            try {
                await updatePost({ id: data._id, data: postData }).unwrap()
                toast({
                    status: "success",
                    message: "Post is updated"
                })
                onClose()
            }
            catch (err) {
                console.log(err)
                toast({
                    status: "error",
                    message: "Something went wrong"
                })
            }
        }
    }

    return (
        <div className={styles.container}>
            <ImageViewer images={images} />
            <div className={styles.post_container}>
                <div className={styles.user}>
                    <Avatar size="sm" src={userDetails.profileImg} name={userDetails.name} />
                    <span>{userDetails.name}</span>
                </div>
                <textarea name="content" value={inputState.content} onChange={inputChange} className={styles.post} placeholder="Write a caption..."></textarea>
                <div className={styles.actions_con}>
                    <div>
                        <Menu menuPlacement="top-start">
                            <MenuButton as="IconButton" icon={<HiOutlineGlobe />} className={styles.icon} />
                            <MenuList>
                                <MenuItem>Public</MenuItem>
                                <MenuItem>Private</MenuItem>
                                <MenuItem>Only me</MenuItem>
                            </MenuList>
                        </Menu>
                        <EmojiPicker onEmojiSelect={(dt) => setInputState(prev => ({ ...prev, content: prev.content + dt.native }))} />
                    </div>
                    <div className={styles.actions}>
                        <Button onClick={onBack} leftIcon={<BsArrowLeftShort />} isTransform={false} size="sm" color="gray">Back</Button>
                        <Button onClick={handleSubmit} isLoading={isSubmit ? createPostLoading : updatePostLoading} leftIcon={<BiPaperPlane />} isTransform={false} size="sm">Share</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WritePost