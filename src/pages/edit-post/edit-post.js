import styles from './edit-post.module.scss'
import { Modal, ModalBody } from 'react-felix-ui'
import { useGetPostQuery } from '@api/postApi'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { WritePost, PostModalSkeleton } from "@components"

const EditPost = () => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { data: postData, isLoading } = useGetPostQuery(postId)

    const handleOnClose = () => {
        navigate(location.state.background.pathname)
    }
    return (
        <Modal
            isOpen={true}
            onClose={handleOnClose}
            size="2xl"
            title="Edit post"
            headerClassName="modal-header"
            overlayClassName={styles.overlay}
        >
            <ModalBody className={styles.modal_body}>
                {isLoading
                    ? <PostModalSkeleton imageClass={styles.skeletonImage} />
                    : <WritePost
                        images={postData.images}
                        data={postData}
                        onClose={handleOnClose}
                        onBack={() => navigate(-1)}
                    />
                }
            </ModalBody>
        </Modal>
    )
}

export default EditPost