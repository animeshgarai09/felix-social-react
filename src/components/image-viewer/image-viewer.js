import styles from "./image-viewer.module.scss"
import { Image, IconButton } from "react-felix-ui"
import { useState } from "react"
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "@icons"

const ImageViewer = ({ images, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleSlide = (action) => {
        switch (action) {
            case "next":
                if (currentIndex !== images?.length - 1) {
                    setCurrentIndex(prev => prev + 1)
                }
                break
            case "prev":
                if (currentIndex !== 0) {
                    setCurrentIndex(prev => prev - 1)
                }
                break
            default:
                break
        }
    }
    return (
        <div className={`${styles.container} ${className}`}>
            <Image src={images[currentIndex]} />
            {images?.length > 1 && <>
                {currentIndex !== images?.length - 1
                    && <IconButton
                        icon={<HiOutlineChevronRight />}
                        onClick={() => handleSlide("next")}
                        className={`${styles.icon} ${styles.right}`}
                    />}
                {currentIndex !== 0
                    && <IconButton
                        onClick={() => handleSlide("prev")}
                        icon={<HiOutlineChevronLeft />}
                        className={`${styles.icon} ${styles.left}`}
                    />}
            </>
            }
        </div>
    )
}

export default ImageViewer