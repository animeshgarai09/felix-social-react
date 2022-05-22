import styles from './post-card.module.scss'
import { Avatar, AvatarGroup, IconButton, Menu, MenuButton, MenuItem, MenuList } from 'react-felix-ui'
import ImageViewer from '../image-viewer/image-viewer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineHeart, MdBookmarkBorder, RiShareForwardLine, BiMessageSquareDetail, BiDotsVerticalRounded } from "@icons"
import { useSelector } from 'react-redux'
import { selectUser } from "@slices/authSlice"
import { selectPostById } from '../../store/api/postApi'
import { dayjsCalender } from "@global/js/day"
import React from 'react'

const PostCard = ({ postId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const postData = useSelector(state => selectPostById(state, postId))
    const { username } = useSelector(selectUser)
    const date = dayjsCalender(postData.createdAt)

    const handleNavigatePost = () => {
        navigate(`/post/${postData._id}`, { state: { background: location } })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Avatar size="md" src={postData.profileImg} name={postData.name} className={styles.avatar} />
                <div className={styles.info}>
                    <span>
                        <Link to={`/profile/${postData.username}`} className={styles.name}>{postData.name}</Link>
                        <Link to={`/profile/${postData.username}`} className={styles.username}>@{postData.username}</Link>
                    </span>
                    <span className={styles.time}>{date}</span>
                </div>
                <Menu menuPlacement="bottom-end">
                    <MenuButton as="IconButton" icon={<BiDotsVerticalRounded />} className={styles.options} />
                    <MenuList className={styles.list}>
                        {username === postData.username ? <MenuItem onClick={() => navigate(`/edit-post/${postData._id}`, { state: { background: location } })}>Edit Post</MenuItem> : <></>}
                        <MenuItem onClick={handleNavigatePost} >Go to post</MenuItem>
                        <MenuItem>Report</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className={styles.caption}>
                {postData.content && <p>{postData.content}</p>}
            </div>
            <ImageViewer images={postData.images} className={styles.image_container} />
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
                    <div className={styles.info}>
                        <span>Be the first to like and comment</span>
                        <Link
                            to={`/post/${postData._id}`}
                            state={{ background: location }}>
                            View all 79 comments
                        </Link>
                    </div>
                </div>
                <div className={styles.options}>
                    <IconButton
                        icon={<BiMessageSquareDetail />}
                        className={styles.icon}
                        onClick={handleNavigatePost}
                    />
                    <IconButton
                        icon={<MdBookmarkBorder />}
                        className={styles.icon}
                    />
                    <IconButton
                        icon={<RiShareForwardLine />}
                        className={styles.icon}
                    />
                </div>
            </div>
        </div>
    )
}

export default React.memo(PostCard)