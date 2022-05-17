import styles from "./write-post.module.scss"
import { Avatar, Button, Menu, MenuButton, MenuList, MenuItem } from "react-felix-ui"
import { BiPaperPlane, BsArrowLeftShort, HiOutlineGlobe } from "@icons"
import ImageViewer from "../image-viewer/image-viewer"

const WritePost = ({ images, onBack }) => {
    return (
        <div className={styles.container}>
            <ImageViewer images={images} />
            <div className={styles.post_container}>
                <div className={styles.user}>
                    <Avatar size="sm" name="Animesh garai" />
                    <span>animeshgarai09</span>
                </div>
                <textarea name="post" className={styles.post} placeholder="Write a caption..."></textarea>
                <div className={styles.actions_con}>
                    <Menu menuPlacement="top-start">
                        <MenuButton as="IconButton" icon={<HiOutlineGlobe />} className={styles.icon} />
                        <MenuList>
                            <MenuItem>Public</MenuItem>
                            <MenuItem>Private</MenuItem>
                            <MenuItem>Only me</MenuItem>
                        </MenuList>
                    </Menu>
                    <div className={styles.actions}>
                        <Button onClick={onBack} leftIcon={<BsArrowLeftShort />} isTransform={false} size="sm" color="gray">Back</Button>
                        <Button leftIcon={<BiPaperPlane />} isTransform={false} size="sm">Share</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WritePost