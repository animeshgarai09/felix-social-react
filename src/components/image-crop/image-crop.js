import styles from "./image-crop.module.scss"
import Cropper from 'react-easy-crop'
import { useState, useCallback, useEffect } from "react"
import useImageDimension from "../../hooks/useImageDimension"
import useImageResize from "../../hooks/useImageResize"
import { IconButton, Button } from "react-felix-ui"
import { HiOutlineChevronRight, HiOutlineChevronLeft, BiImageAlt } from "@icons"

const ImageCrop = ({ isHidden, selectedImages, handleNext }) => {
    const [listOfSelectedImages, setListOfSelectedImages] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [isMultiple, setIsMultiple] = useState(false)
    const [isAllVisited, setVisitedState] = useState(false)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1.5)
    const [isGridVisible, setGrid] = useState(false)

    const getImageOrientation = useImageDimension()

    const imageResize = useImageResize({ maxWidth: 2000, maxHeight: 2000, quality: 90 })

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        if (listOfSelectedImages !== null) {
            const temp = [...listOfSelectedImages]
            temp[currentIndex].croppedArea = croppedAreaPixels
            temp[currentIndex].zoom = zoom
            setListOfSelectedImages(temp)
            setCurrentImage(prev => ({ ...prev, croppedArea: croppedAreaPixels }))
        }
    }, [listOfSelectedImages, currentIndex, zoom])

    //todo fix initialCropSelection on change. 

    const handleSlide = (action) => {
        switch (action) {
            case "next":
                if (currentIndex !== listOfSelectedImages.length - 1) {
                    const temp = [...listOfSelectedImages]
                    temp[currentIndex].crop = crop
                    setListOfSelectedImages(temp)
                    const nextImage = listOfSelectedImages[currentIndex + 1]
                    setZoom(nextImage.zoom)
                    setCrop({ ...nextImage.crop })
                    setCurrentImage(nextImage)
                    setCurrentIndex(prev => prev + 1)
                    currentIndex + 1 === listOfSelectedImages.length - 1 && setVisitedState(true)
                }
                break
            case "prev":
                if (currentIndex !== 0) {
                    const temp = [...listOfSelectedImages]
                    temp[currentIndex].crop = crop
                    setListOfSelectedImages(temp)
                    const prevImage = listOfSelectedImages[currentIndex - 1]
                    setZoom(prevImage.zoom)
                    setCrop({ ...prevImage.crop })
                    setCurrentImage(prevImage)
                    setCurrentIndex(prev => prev - 1)
                }
                break
            default:
                break
        }
    }

    useEffect(() => {
        selectedImages.length !== 1 && setIsMultiple(true)
        const Promises = selectedImages.map(async (file, i) => {
            let tempImg = await imageResize(file)
            const { orientation } = await getImageOrientation(tempImg)
            return {
                image: tempImg,
                file: file,
                orientation: orientation,
                crop: { x: 0, y: 0 },
                zoom: 1.5
            }
        })
        Promise.all(Promises).then((processedImages) => {
            setListOfSelectedImages(processedImages)
            setCurrentImage(processedImages[0])
        })
    }, [selectedImages])

    return (
        <div className={`${styles.container} ${isHidden && styles.hide}`}>
            <Cropper
                image={currentImage?.image}
                crop={crop}
                cropSize={{ width: 514, height: 514 }}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={(num) => num >= 1.5 && setZoom(num)}
                onInteractionStart={() => setGrid(true)}
                onInteractionEnd={() => setGrid(false)}
                showGrid={isGridVisible}
                restrictPosition={true}
                objectFit={currentImage?.orientation + "-cover"}
            />
            <div className={styles.overlay}>
                {isMultiple && <>
                    {currentIndex !== listOfSelectedImages?.length - 1
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
                <div className={styles.bottom}>
                    <IconButton
                        onClick={() => handleSlide("prev")}
                        icon={<BiImageAlt />}
                        className={styles.icon}
                    />
                    {((isMultiple && isAllVisited) || !isMultiple) && <Button size="sm" onClick={() => handleNext([...listOfSelectedImages])} className={styles.button}>Next</Button>}
                </div>
            </div>
        </div>
    )
}

export default ImageCrop