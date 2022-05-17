import styles from './edit-profile-form.module.scss'
import { Input, Button } from 'react-felix-ui'
const EditProfileForm = () => {
    return (
        <div className={styles.container}>
            <Input type="text" label="Name" placeholder="(e.g) Animesh Garai" />
            <Input type="textarea" height="100" label="Short Bio" placeholder="Write a short bio about you..." />
            <div className={styles.flex}>
                <Input type="text" label="Location" placeholder="(e.g) Kolkata " />
                <Input type="text" label="Website" placeholder="(e.g) www.website.com" />
            </div>
            <Input type="text" label="Email" placeholder="(e.g) animeshgarai09@gmail.com" />

            <div className={styles.controls}>
                <Button color="gray">Cancel</Button>
                <Button >Update Profile</Button>
            </div>
        </div>
    )
}

export default EditProfileForm