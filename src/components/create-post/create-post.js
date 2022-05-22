import styles from "./create-post.module.scss"
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { BsFileEarmarkImage } from "@icons"
import { Modal, ModalBody, useToast } from "react-felix-ui"
import image from "@assets/images/picture.png"
import ImageCrop from "../image-crop/image-crop"
import getCroppedImg from "@global/js/cropImage"
import WritePost from "../write-post/write-post"
import PostModalSkeleton from "../post-modal-skeleton/post-modal-skeleton"
const CreatePost = () => {
    const [isModalOpen, setModalState] = useState(false)
    const [droppedImages, setDroppedImages] = useState(null)

    const [croppedImages, setCroppedImages] = useState(null)
    const [isNext, setNext] = useState(false)
    const toast = useToast()

    const handleNext = (images) => {
        setNext(true)
        const promises = images.map(async ({ image, croppedArea }) => {
            return await getCroppedImg(image, croppedArea)
        })

        Promise.all(promises).then((croppedImages) => {
            setCroppedImages(croppedImages)
        })
    }
    const handleModalClose = () => {
        setModalState(false)
        setNext(false)
        setDroppedImages(null)
        setCroppedImages(null)
    }
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        if (acceptedFiles.length !== 0) {
            setDroppedImages(acceptedFiles)
            setModalState(true)
        } else {
            toast({
                status: "error",
                message: "Invalid file type selected",
            })
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        // maxSize: 15728640,
        onDrop
    })

    return (
        <>
            <div className={styles.dropZone} {...getRootProps()}>
                <div className={`${styles.inner} ${isDragActive && styles.border}`} >
                    <input {...getInputProps()} />
                    {/* <Avatar name="Animesh garai" size="sm" className={styles.avatar} /> */}
                    <img src={image} alt="" />
                    {/* <BsFileEarmarkImage className={styles.icon} /> */}
                    {
                        isDragActive ?
                            <p>Drop photos like it's hot</p> :
                            <p>Drop your your stunning photos here.</p>
                    }
                </div>
            </div>
            <Modal
                className={styles.post_modal}
                isOpen={isModalOpen}
                size={isNext ? "2xl" : "md"}
                onClose={handleModalClose}
                title={isNext ? "Create new post" : "Crop Images"}
                closeOnOverlayClick={false}
                headerClassName="modal-header"
                overlayClassName={isNext && styles.overlay}
            >
                <ModalBody className={styles.modal_body}>
                    <ImageCrop
                        isHidden={isNext}
                        selectedImages={droppedImages}
                        handleNext={handleNext} />
                    {isNext && (croppedImages
                        ? <WritePost
                            images={croppedImages}
                            onBack={() => setNext(false)}
                            onClose={handleModalClose}
                            isSubmit
                        />
                        : <PostModalSkeleton imageClass={styles.skeletonImage} />)

                    }
                </ModalBody>
            </Modal>
        </>
    )
}

export default CreatePost