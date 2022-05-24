import { Avatar, IconButton } from 'react-felix-ui'
import styles from './post-modal.module.scss'
import { AiOutlineHeart } from "@icons"
import { useDeleteCommentFromPostMutation, useUpdateCommentToPostMutation } from "@api/commentApi"
import { useState } from 'react'
import useInputHandler from "@hooks/useInputHandler"
const CommentCard = ({ comment, isUser, postId }) => {
    const [deleteComment] = useDeleteCommentFromPostMutation()
    const [updateComment] = useUpdateCommentToPostMutation()
    const [isEditOpen, setEdit] = useState(false)

    const { inputState, inputChange, setInputState } = useInputHandler({
        comment: comment.text
    })

    const handleEdit = () => {
        setInputState({ comment: comment.text })
        setEdit(true)
    }
    const handleCancel = () => {
        setEdit(false)
        setInputState({ comment: comment.text })
    }

    const handleSave = () => {
        updateComment({
            postId,
            commentData: {
                id: comment._id,
                text: inputState.comment
            }
        })
        setEdit(false)
    }
    return (
        <div className={styles.comment}>
            <Avatar src={comment.profileImg} size="sm" name={comment.name} className={styles.avatar} />
            <div style={{ flex: "1 1" }}>
                <div className={styles.comment_header}>
                    <a>{comment.name}</a>
                    <IconButton
                        icon={<AiOutlineHeart />}
                        className={`${styles.icon}`}
                    />
                </div>
                {!isEditOpen && <span className={styles.text}>{comment.text}</span>}
                {isEditOpen &&
                    <textarea name="comment" autoCorrect='off' autoComplete='off' placeholder="Edit a comment..." value={inputState.comment} onChange={inputChange} ></textarea>
                }
                <div className={styles.comment_actions}>
                    <span>10 Likes</span>
                    {isUser && !isEditOpen &&
                        <>
                            <span onClick={handleEdit} className={styles.click}>Edit</span>
                            <span onClick={() => deleteComment({ postId, commentId: comment._id })} className={`${styles.delete} ${styles.click}`}>Delete</span>
                        </>
                    }

                    {isEditOpen &&
                        <>
                            <span onClick={handleCancel} className={styles.click}>Cancel</span>
                            <span onClick={handleSave} className={`${styles.save} ${styles.click}`}>Save</span>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentCard