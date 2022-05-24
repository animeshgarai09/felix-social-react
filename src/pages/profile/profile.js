import styles from './profile.module.scss'
import { IconButton, Button, Avatar, Modal, ModalBody, } from 'react-felix-ui'
import { MdPhotoCamera, FiEdit3, BiCalendar, AiFillHeart, AiFillMessage, RiUserAddLine, AiOutlineLink, BiMap, RiUserFollowLine, BiImages } from "@icons"
import { NavLink, Link, useParams, useLocation, useNavigate } from 'react-router-dom'
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

import { useGetAllPostsByUsernameQuery, useGetAllBookmarksQuery } from '@api/postApi'
import { selectAllBookmarks } from "@api/postApi"

const Profile = () => {
    const { username } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { pathname } = location
    const [isModalOpen, setModalState] = useState(false)
    const [isDefault, setDefault] = useState(false)
    const isSavedPage = pathname.split("/").includes("saved")

    const userDetails = useSelector(selectUser)
    const userFollowerCount = useSelector(followerCount)
    const userFollowingsCount = useSelector(followingsCount)


    let { data: userData, isLoading: isUserDataLoading } = useGetUserDetailsQuery(username)
    userData = isDefault ? userDetails : userData

    const { isLoading: isBookmarksLoading } = useGetAllBookmarksQuery()
    const allBookmarks = useSelector(selectAllBookmarks)

    const { data: postList, isLoading: isPostListLoading } = useGetAllPostsByUsernameQuery(username)

    const isUserFollowing = useSelector(state => selectFollowingsById(state, userData?._id))



    let [followUser, { isLoading: isFollowing }] = useFollowMutation()
    let [unfollowUser, { isLoading: isUnFollowing }] = useUnfollowMutation()

    const renderUserActions = () => {
        if (isDefault)
            return <Button onClick={() => setModalState(true)} isTransform={false} isRound variant="outline" leftIcon={<FiEdit3 />} className={styles.icon}>Edit Profile</Button>
        if (!isDefault && !isUserFollowing)
            return <Button onClick={() => followUser(userData._id)} isTransform={false} isRound leftIcon={<RiUserAddLine />} isLoading={isFollowing} className={styles.icon}>Follow</Button>
        if (!isDefault && isUserFollowing)
            return <Button onClick={() => unfollowUser(userData._id)} isTransform={false} variant="outline" isRound leftIcon={<RiUserFollowLine />} isLoading={isUnFollowing} className={styles.icon}>Unfollow</Button>

    }

    useEffect(() => {
        username === userDetails.username && setDefault(true)
        if (isSavedPage && !isDefault && userData) {
            navigate(`/profile/${userData?.username}`, { replace: true })
        }
    }, [username, userData])

    const handleActiveNav = (navigationData) => {
        return navigationData.isActive ? styles.active : ""
    }
    return (
        <>
            <Helmet>
                <title>{`${userData ? userData?.name + " |" : ""}`} Felix Social</title>
            </Helmet>
            <div className={styles.container}>
                {(!isDefault && isUserDataLoading) || !userData
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
                                <Link to="followers"><span>{isDefault ? userFollowerCount : userData.followers.length}</span> Followers</Link>
                                <Link to="following"><span>{isDefault ? userFollowingsCount : userData.following.length}</span> Following</Link>
                            </div>
                            {userData.bio && <p>{userData.bio}</p>}
                            <div>
                                <span className={styles.point}><BiCalendar /> Joined on November 2015</span>
                                {userData.website && <a href='#' className={styles.point}><AiOutlineLink />{userData.website}</a>}
                                {userData.location && <span className={styles.point}><BiMap /> {userData.location}</span>}
                            </div>
                        </div>
                    </div>}

                <div className={styles.posts_containner}>
                    {isPostListLoading || isBookmarksLoading
                        ? <PostsSkeleton />
                        : <>
                            <div className={styles.tabs}>
                                <NavLink className={(navigationData) => handleActiveNav(navigationData)} to={`/profile/${userData?.username}`} end>Posts ({postList.ids.length})</NavLink>
                                {isDefault && <NavLink className={(navigationData) => handleActiveNav(navigationData)} to={`/profile/${userData?.username}/saved`} href="#">Saved ({allBookmarks.length})</NavLink>}
                            </div>
                            <div className={styles.posts}>
                                {isSavedPage
                                    ? allBookmarks.map(post => {
                                        return (
                                            <Link key={post._id} to={`/post/${post._id}`} state={{ background: location }}>
                                                <div className={styles.post}>
                                                    <img src={post.images[0]} alt="cover" />
                                                    {post.images.length > 1 && <BiImages className={styles.multiple} />}
                                                    <div href="#" className={styles.overlay}>
                                                        <span><AiFillHeart /> {post.likes.likeCount}</span>
                                                        <span><AiFillMessage />10</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                    : postList.ids.map(id => {
                                        const post = postList.entities[id]
                                        return (
                                            <Link key={id} to={`/post/${id}`} state={{ background: location }}>
                                                <div className={styles.post}>
                                                    <img src={post.images[0]} alt="cover" />
                                                    {post.images.length > 1 && <BiImages className={styles.multiple} />}
                                                    <div href="#" className={styles.overlay}>
                                                        <span><AiFillHeart /> {post.likes.likeCount}</span>
                                                        <span><AiFillMessage />{post.comments.length}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </>

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
        <div className={styles.posts}>
            <div className={`${styles.skeleton} ${styles.post}`}></div>
            <div className={`${styles.skeleton} ${styles.post}`}></div>
            <div className={`${styles.skeleton} ${styles.post}`}></div>
        </div>
    )
}
export default Profile