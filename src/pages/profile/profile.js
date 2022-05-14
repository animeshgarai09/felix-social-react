import styles from './profile.module.scss'
import cover from "@assets/images/cover.jpg"
import profile from "@assets/images/profile.jpg"
import { IconButton, Button, Avatar, Modal, ModalBody } from 'react-felix-ui'
import { MdPhotoCamera, FiEdit3, BiCalendar, AiFillHeart, AiFillMessage } from "@icons"
import { Link } from 'react-router-dom'
import image1 from "@assets/images/1-demo.jpeg"
import image2 from "@assets/images/2-demo.jpeg"
import image3 from "@assets/images/3-demo.jpeg"
import image4 from "@assets/images/4-demo.jpeg"
import { useState } from 'react'
import { EditProfileForm } from '@components'

const Profile = () => {
    const [isModalOpen, setModalState] = useState(false)
    return (
        <>
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
                                <Button onClick={() => setModalState(true)} isTransform={false} isRound size="sm" variant="outline" leftIcon={<FiEdit3 />} className={styles.edit}>Edit Profile</Button>
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
                        <div href="#" className={styles.overlay}>
                            <span><AiFillHeart /> 40</span>
                            <span><AiFillMessage />10</span>
                        </div>
                    </div>
                    <div className={styles.post}>
                        <img src={image2} alt="cover" />
                        <div href="#" className={styles.overlay}>
                            <span><AiFillHeart /> 40</span>
                            <span><AiFillMessage />10</span>
                        </div>
                    </div>
                    <div className={styles.post}>
                        <img src={image3} alt="cover" />
                        <div href="#" className={styles.overlay}>
                            <span><AiFillHeart /> 40</span>
                            <span><AiFillMessage />10</span>
                        </div>
                    </div>
                    <div className={styles.post}>
                        <img src={image4} alt="cover" />
                        <div href="#" className={styles.overlay}>
                            <span><AiFillHeart /> 40</span>
                            <span><AiFillMessage />10</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} title="Edit Profile" onClose={() => setModalState(false)} headerClassName="modal-header">
                <ModalBody>
                    <EditProfileForm />
                </ModalBody>
            </Modal>
        </>
    )
}

export default Profile