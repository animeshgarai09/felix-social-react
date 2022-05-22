import styles from './user-card.module.scss'
import { ReactComponent as Wave } from "@assets/svg/Waves.svg"
import { IconButton, Avatar, useToast } from 'react-felix-ui'
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
        <div className={styles.container}>
            <div className={styles.cover}>
                {
                    user.coverImg
                        ? <img src={user.coverImg} />
                        : <Wave />
                }
            </div>
            <div className={styles.user}>
                <div className={styles.avatar_con}>
                    <Avatar src={user.profileImg} size="xl" name={user.name} className={styles.avatar} />
                </div>
                <div className={styles.con}>
                    <div className={styles.name}>
                        <Link to={`/profile/${user.username}`}>{user.name}</Link>
                        <Link to={`/profile/${user.username}`}>@{user.username}</Link>
                    </div>
                    {!isUser && <div className={styles.actions}>
                        <IconButton icon={isFollowing ? <RiUserFollowLine /> : <RiUserAddLine />} onClick={handleButtonClick} className={styles.action} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default UserCard