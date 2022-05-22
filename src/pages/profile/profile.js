import styles from './profile.module.scss'
import { IconButton, Button, Avatar, Modal, ModalBody, } from 'react-felix-ui'
import { MdPhotoCamera, FiEdit3, BiCalendar, AiFillHeart, AiFillMessage, HiUserAdd, AiOutlineLink, BiMap, HiUserRemove, BiImages } from "@icons"
import { Link, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { EditProfileForm } from '@components'
import { useSelector } from "react-redux"
import { selectUser, followerCount, followingsCount, selectFollowingsById } from '@slices/authSlice'
import { ReactComponent as Wave } from "@assets/svg/Waves.svg"
import {
    useGetUserDetailsQuery,
    useFollowMutation,
    useUnfollowMutation,
} from '@api/userApi'
import { Helmet } from "react-helmet"


import { useGetAllPostsByUsernameQuery } from '@api/postApi'

const Profile = () => {
    const { username } = useParams()
    const location = useLocation()
    const [isModalOpen, setModalState] = useState(false)

    const userDetails = useSelector(selectUser)
    const userFollowerCount = useSelector(followerCount)
    const userFollowingsCount = useSelector(followingsCount)

    const [isDefault, setDefault] = useState(false)
    console.log("🚀 ~ file: profile.js ~ line 30 ~ Profile ~ isDefault", isDefault)

    let { data: userData, isLoading: isUserDataLoading } = useGetUserDetailsQuery(username)
    userData = isDefault ? userDetails : userData

    const { data: postList, isLoading: isPostListLoading, isError, error } = useGetAllPostsByUsernameQuery(username)
    console.log("🚀 ~ file: profile.js ~ line 38 ~ Profile ~ postList", postList)

    isError && console.log(error)
    const isUserFollowing = useSelector(state => selectFollowingsById(state, userData?._id))

    let [followUser, { isLoading: isFollowing }] = useFollowMutation()
    let [unfollowUser, { isLoading: isUnFollowing }] = useUnfollowMutation()

    const renderUserActions = () => {
        if (isDefault)
            return <Button onClick={() => setModalState(true)} isTransform={false} isRound variant="outline" leftIcon={<FiEdit3 />} className={styles.icon}>Edit Profile</Button>
        if (!isDefault && !isUserFollowing)
            return <Button onClick={() => followUser(userData._id)} isTransform={false} isRound leftIcon={<HiUserAdd />} isLoading={isFollowing} className={styles.icon}>Follow</Button>
        if (!isDefault && isUserFollowing)
            return <Button onClick={() => unfollowUser(userData._id)} isTransform={false} variant="outline" isRound leftIcon={<HiUserRemove />} isLoading={isUnFollowing} className={styles.icon}>Unfollow</Button>

    }

    useEffect(() => {
        username === userDetails.username && setDefault(true)
    }, [username])
    return (
        <>
            <Helmet>
                <title>{`${userData?.name} |`} Felix Social</title>
            </Helmet>
            <div className={styles.container}>
                {isUserDataLoading || !userData
                    ? <ProfileDetailsSkeleton />
                    : <div className={styles.details}>
                        <div className={styles.cover}>
                            {userData.coverImg
                                ? <img src={userData.coverImg} alt="cover" />
                                : <Wave />
                            }
                            {isDefault && <IconButton icon={<MdPhotoCamera />} className={styles.edit} />}
                        </div>
                        <div className={styles.user}>
                            <div className={styles.avatar_con}>
                                <Avatar src={userData.profileImg ? userData.profileImg : ""} name={userData.name} size='xxl' className={styles.avatar} />
                                {isDefault && <IconButton icon={<MdPhotoCamera />} className={styles.edit} />}
                            </div>
                            <div className={styles.con}>
                                <div className={styles.name}>
                                    <h4>{userData.name}</h4>
                                    <span>@{userData.username}</span>
                                </div>
                                <div className={styles.actions}>
                                    {renderUserActions()}
                                </div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.links}>
                                <Link to="#"><span>{isDefault ? userFollowerCount : userData.followers.length}</span> Followers</Link>
                                <Link to="#"><span>{isDefault ? userFollowingsCount : userData.following.length}</span> Following</Link>
                            </div>
                            {userData.bio && <p>{userData.bio}</p>}
                            <div>
                                <span className={styles.point}><BiCalendar /> Joined on November 2015</span>
                                {userData.website && <a href='#' className={styles.point}><AiOutlineLink />{userData.website}</a>}
                                {userData.location && <span className={styles.point}><BiMap /> Kolkata</span>}
                            </div>
                        </div>
                    </div>}
                <div className={styles.posts}>
                    {isPostListLoading
                        ? <PostsSkeleton />
                        : postList.ids.map(id => {
                            const post = postList.entities[id]
                            return (
                                <Link to={`/post/${id}`} state={{ background: location }}>
                                    <div className={styles.post}>
                                        <img src={post.images[0]} alt="cover" />
                                        {post.images.length > 1 && <BiImages className={styles.multiple} />}
                                        <div href="#" className={styles.overlay}>
                                            <span><AiFillHeart /> 40</span>
                                            <span><AiFillMessage />10</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <Modal isOpen={isModalOpen} title="Edit Profile" onClose={() => setModalState(false)} headerClassName="modal-header">
                <ModalBody>
                    <EditProfileForm userData={userDetails} onClose={() => setModalState(false)} />
                </ModalBody>
            </Modal>
        </>
    )
}


const ProfileDetailsSkeleton = () => {
    return (
        <div className={styles.details}>
            <div className={`${styles.skeleton} ${styles.cover}`}></div>
            <div className={styles.user}>
                <div className={styles.avatar_con}>
                    <div className={`${styles.skeleton} ${styles.circle}`}></div>
                </div>
                <div className={styles.con}>
                    <div className={styles.name}>
                        <span className={`${styles.skeleton} ${styles.line}`}></span>
                        <span className={`${styles.skeleton} ${styles.line}`}></span>
                    </div>
                    <div className={styles.actions}>
                        <span className={`${styles.skeleton} ${styles.line}`}></span>
                    </div>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.links}>
                    <span className={`${styles.skeleton} ${styles.line}`}></span>
                    <span className={`${styles.skeleton} ${styles.line}`}></span>
                </div>
                <span className={`${styles.skeleton} ${styles.line}`}></span>
            </div>
        </div>
    )
}

const PostsSkeleton = () => {
    return (
        <>
            <div className={`${styles.skeleton} ${styles.post}`}></div>
            <div className={`${styles.skeleton} ${styles.post}`}></div>
            <div className={`${styles.skeleton} ${styles.post}`}></div>
        </>
    )
}
export default Profile