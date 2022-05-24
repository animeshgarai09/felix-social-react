import styles from './post-reaction-modal.module.scss'
import { Button, Avatar, useToast } from 'react-felix-ui'
import { RiUserAddLine, RiUserFollowLine } from "@icons"
import { Link } from 'react-router-dom'
import {
    useFollowMutation,
    useUnfollowMutation,
} from '@api/userApi'
const UserCard = ({ user, isFollowing, isUser }) => {
    const toast = useToast()
    let [followUser, { isLoading: isFollowingLoading }] = useFollowMutation()
    let [unfollowUser, { isLoading: isUnFollowingLoading }] = useUnfollowMutation()

    const handleButtonClick = async () => {
        if (isFollowing) {
            await unfollowUser(user._id).unwrap()
            toast({
                status: "success",
                message: `Unfollowed ${user.name}`
            })
        } else {
            await followUser(user._id).unwrap()
            toast({
                status: "success",
                message: `Followed ${user.name}`
            })
        }
    }
    return (
        <div className={styles.user}>
            <Avatar src={user.profileImg} name={user.name} className={styles.avatar} />
            <div className={styles.info}>
                <Link to={`/profile/${user.username}`}>{user.name}</Link>
                <Link to={`/profile/${user.username}`}>@{user.username}</Link>
            </div>
            {!isUser && <Button onClick={handleButtonClick} leftIcon={isFollowing ? <RiUserFollowLine /> : <RiUserAddLine />} isTransform={false} size="sm"> {isFollowing ? "Unfollow" : "Follow"}</Button>}
        </div>
    )
}

export default UserCard