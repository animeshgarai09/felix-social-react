import styles from './post-reaction-modal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectReactionState, resetReactionState } from '@slices/globalSlice'
import { Modal, ModalBody } from 'react-felix-ui'
import UserCard from './user-card'
import { selectUserForReaction, selectFollowingsIds } from '@slices/authSlice'

const PostReactionModal = () => {
    const [isOpen, reactionData] = useSelector(selectReactionState)
    const dispatch = useDispatch()

    const userDetails = useSelector(selectUserForReaction)
    const userFollowingsIds = useSelector(selectFollowingsIds)

    return (
        <Modal
            title="Likes"
            isOpen={isOpen}
            size="sm"
            onClose={() => dispatch(resetReactionState())}
            headerClassName="modal-header"
        >
            <ModalBody className={styles.container}>
                {
                    reactionData.map((user) => {
                        const isFollowing = userFollowingsIds.includes(user._id)
                        const isUser = user._id === userDetails._id
                        return <UserCard key={user._id} user={user} isFollowing={isFollowing} isUser={isUser} />
                    })
                }

            </ModalBody>
        </Modal>
    )
}

export default PostReactionModal