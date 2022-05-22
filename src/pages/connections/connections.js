import styles from './connections.module.scss'
import { IconButton, Avatar } from 'react-felix-ui'
import { FiArrowLeft } from "@icons"
import { NavLink, Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { selectUserForReaction, selectFollowersIds, selectFollowingsIds, selectAllFollowers, selectAllFollowings } from '@slices/authSlice'
import {
    useGetUserDetailsQuery,
} from '@api/userApi'
import { Helmet } from "react-helmet"
import { UserCard } from "@components"
const Connections = () => {

    const { username } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { pathname } = location
    const isFollowing = pathname.split("/").includes("following")
    const [isDefault, setDefault] = useState(false)

    const userDetails = useSelector(selectUserForReaction)
    const userFollowingsIds = useSelector(selectFollowingsIds)
    const userAllFollowers = useSelector(selectAllFollowers)
    const userAllFollowings = useSelector(selectAllFollowings)

    const { data: userData, isLoading: isConnectionDataLoading } = useGetUserDetailsQuery(username)

    const userConnectionData = isDefault
        ? {
            followers: userAllFollowers,
            following: userAllFollowings
        }
        : {
            followers: userData?.followers,
            following: userData?.following
        }

    const handleActiveNav = (navigationData) => {
        return navigationData.isActive ? styles.active : ""
    }

    const handleBack = () => {
        navigate(`/profile/${isDefault ? userDetails.username : userData.username}`)
    }

    const renderPage = () => {
        if (!isFollowing) {
            if (!isDefault && isConnectionDataLoading) {
                return <h4>Loading</h4>
            } else {
                if (userConnectionData.followers.length === 0) {
                    return <div className={styles.not_found}>
                        <h2>Looking for followers?</h2>
                        <p>When someone follows this account, they’ll show up here. Sharing and interacting with others helps boost followers.</p>
                    </div>
                } else {
                    return userConnectionData.followers.map((user) => {
                        const isFollowing = userFollowingsIds.includes(user._id)
                        const isUser = user._id === userDetails._id
                        return <UserCard key={user._id} user={user} isFollowing={isFollowing} isUser={isUser} />
                    })
                }
            }
        } else {
            if (!isDefault && isConnectionDataLoading) {
                return <h4>Loading</h4>
            } else {
                if (userConnectionData.following.length === 0) {
                    return <div className={styles.not_found}>
                        <h2>Looking for following?</h2>
                        <p>When the user follows other account, they’ll show up here. Sharing and interacting with others helps boost followings.</p>
                    </div>
                } else {
                    return userConnectionData.following.map((user) => {
                        const isFollowing = userFollowingsIds.includes(user._id)
                        const isUser = user._id === userDetails._id
                        return <UserCard key={user._id} user={user} isFollowing={isFollowing} isUser={isUser} />
                    })
                }
            }
        }
    }


    useEffect(() => {
        username === userDetails.username && setDefault(true)
        // if (!isDefault && userData) {
        //     navigate(`/profile/${userData?.username}`, { replace: true })
        // }
    }, [username])
    return (
        <div className={styles.container}>
            {(!isDefault && isConnectionDataLoading)
                ? <h4>Loading</h4>
                : <>
                    <div className={styles.tabs}>
                        <div className={styles.header}>
                            <IconButton icon={<FiArrowLeft />} className={styles.back} onClick={handleBack} />
                            <Avatar src={isDefault ? userDetails.profileImg : userData.profileImg} size="md" name={isDefault ? userDetails.name : userData.name} className={styles.avatar} />
                            <div className={styles.info}>
                                <span className={styles.name}>{isDefault ? userDetails.name : userData.name}</span>
                                <span className={styles.username}>@{isDefault ? userDetails.username : userData.username}</span>
                            </div>
                        </div>
                        <NavLink className={(navigationData) => handleActiveNav(navigationData)} to={`/profile/${username}/followers`} end>Followers</NavLink>
                        <NavLink className={(navigationData) => handleActiveNav(navigationData)} to={`/profile/${username}/following`} href="#">Following</NavLink>
                    </div>

                    <div className={styles.sub_con}>
                        {renderPage()}
                    </div>
                </>
            }
        </div>
    )
}



export default Connections