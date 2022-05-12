import styles from './profile.module.scss'
import cover from "@assets/images/cover.jpg"
import profile from "@assets/images/profile.jpg"
import { IconButton, Button, Avatar } from 'react-felix-ui'
import { MdPhotoCamera, FiEdit3, BiCalendar } from "@icons"
import { Link } from 'react-router-dom'
import image1 from "@assets/images/1-demo.jpeg"
import image2 from "@assets/images/2-demo.jpeg"
import image3 from "@assets/images/3-demo.jpeg"
import image4 from "@assets/images/4-demo.jpeg"
const Profile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <div className={styles.cover}>
                    <img src={cover} alt="cover" />
                    <IconButton icon={<MdPhotoCamera />} className={styles.edit} />
                </div>
                <div className={styles.user}>
                    <Avatar src={profile} size='xxl' className={styles.avatar} />
                    <div className={styles.con}>
                        <div className={styles.name}>
                            <h5>Animesh Garai</h5>
                            <span>@animeshgarai09</span>
                        </div>
                        <div className={styles.actions}>
                            <Button isTransform={false} isRound size="sm" variant="outline" leftIcon={<FiEdit3 />} className={styles.edit}>Edit Profile</Button>
                        </div>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.links}>
                        <Link to="#"><span>0</span> Followers</Link>
                        <Link to="#"><span>10</span> Following</Link>
                    </div>
                    <span className={styles.point}><BiCalendar />  Joined on November 2015</span>
                    <p>Creative web developer | ❤️ CSS & Javascript | Building components in the world of web</p>
                </div>
            </div>
            <div className={styles.posts}>
                <div className={styles.post}>
                    <img src={image1} alt="cover" />
                </div>
                <div className={styles.post}>
                    <img src={image2} alt="cover" />
                </div>
                <div className={styles.post}>
                    <img src={image3} alt="cover" />
                </div>
                <div className={styles.post}>
                    <img src={image4} alt="cover" />
                </div>
            </div>
        </div>
    )
}

export default Profile