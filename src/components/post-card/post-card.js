import styles from './post-card.module.scss'
import { Avatar, AvatarGroup, IconButton } from 'react-felix-ui'
import ImageViewer from '../image-viewer/image-viewer'
import image1 from "@assets/images/1-demo.jpeg"
import image2 from "@assets/images/2-demo.jpeg"
import image3 from "@assets/images/3-demo.jpeg"
import image4 from "@assets/images/4-demo.jpeg"
import { AiOutlineHeart, MdBookmarkBorder, RiShareForwardLine } from "@icons"
const PostCard = () => {
    const images = [image1, image2, image3, image4]
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Avatar size="sm" name="Animesh garai" />
                <div className={styles.info}>
                    <span className={styles.user}>Animesh Garai</span>
                    <span className={styles.time}>July 26 2018, 01:03pm</span>
                </div>
            </div>
            <div className={styles.caption}>
                <p>Yesterday with @Karen Miller and @Marvin Stemperd at the #Rock'n'Rolla concert in LA. Was totally fantastic! People were really excited about this one!</p>
            </div>
            <ImageViewer images={images} className={styles.image_container} />
            <div className={styles.actions}>
                <div className={styles.react}>
                    <IconButton
                        icon={<AiOutlineHeart />}
                        // onClick={() => handleSlide("next")}
                        className={styles.icon}
                    />
                    <AvatarGroup size='sm' show={5} max={76} className={styles.avatar_group}>
                        <Avatar name='Dan Abrahmov' />
                        <Avatar name='Kola Tioluwani' />
                        <Avatar name='Kent Dodds' />
                        <Avatar name='Ryan Florence' />
                        <Avatar name='Christian Nwamba' />
                        <Avatar name='Segun Adebayo' />
                    </AvatarGroup>
                </div>
                <div className={styles.options}>
                    <IconButton
                        icon={<MdBookmarkBorder />}
                        // onClick={() => handleSlide("next")}
                        className={styles.icon}
                    />
                    <IconButton
                        icon={<RiShareForwardLine />}
                        // onClick={() => handleSlide("next")}
                        className={styles.icon}
                    />
                </div>
            </div>
            <div className={styles.comment}>
                <Avatar size="sm" name="Animesh garai" />
                <div className={styles.input_con}>
                    <input type="text" placeholder="Write a comment..." />
                </div>
            </div>
        </div>
    )
}

export default PostCard