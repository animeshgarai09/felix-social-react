import styles from '../profile.module.scss'
import { IconButton, Button, Avatar, Modal, ModalBody, } from 'react-felix-ui'
import { MdPhotoCamera, FiEdit3, BiCalendar, AiFillHeart, AiFillMessage, HiUserAdd, AiOutlineLink, BiMap, HiUserRemove } from "@icons"
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { EditProfileForm } from '@components'
import { useSelector } from "react-redux"
import { selectUser, followerCount, followingsCount, selectFollowingsById } from '@slices/authSlice'
import { ReactComponent as Wave } from "@assets/svg/Waves.svg"
import {
    useGetUserDetailsQuery,
    useFollowMutation,
    useUnfollowMutation,
} from '@api/userApi'


import { useGetAllPostsByUsernameQuery } from '@api/postApi'
const ProfileDetails = () => {
    const { username } = useParams()
    const [isModalOpen, setModalState] = useState(false)

    const userDetails = useSelector(selectUser)
    const userFollowerCount = useSelector(followerCount)
    const userFollowingsCount = useSelector(followingsCount)

    const [isDefault, setDefault] = useState(username === userDetails.username)

    let { data: userData, isLoading: isUserDataLoading } = useGetUserDetailsQuery(username)
    userData = isDefault ? userDetails : userData

    const { data, isLoading, isError } = useGetAllPostsByUsernameQuery(userData?.username)

    const isUserFollowing = useSelector(state => selectFollowingsById(state, userData?._id))

    let [followUser, { isLoading: isFollowing }] = useFollowMutation()
    let [unfollowUser, { isLoading: isUnFollowing }] = useUnfollowMutation()

    const renderUserActions = () => {
        if (username === userDetails.username)
            return <Button onClick={() => setModalState(true)} isTransform={false} isRound variant="outline" leftIcon={<FiEdit3 />} className={styles.icon}>Edit Profile</Button>
        if (username !== userDetails.username && !isUserFollowing)
            return <Button onClick={() => followUser(userData._id)} isTransform={false} isRound leftIcon={<HiUserAdd />} isLoading={isFollowing} className={styles.icon}>Follow</Button>
        if (username !== userDetails.username && isUserFollowing)
            return <Button onClick={() => unfollowUser(userData._id)} isTransform={false} variant="outline" isRound leftIcon={<HiUserRemove />} isLoading={isUnFollowing} className={styles.icon}>Unfollow</Button>

    }
    return (
        <div className={styles.details}>
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
        </div>
    )
}

export default ProfileDetails