import styles from './edit-profile-form.module.scss'
import { Input, Button } from 'react-felix-ui'
const EditProfileForm = () => {
    return (
        <div className={styles.container}>
            <Input type="text" label="Name" />
            <Input type="textarea" height="100" label="Short Bio" />
            <div className={styles.flex}>
                <Input type="text" label="Location" />
                <Input type="text" label="Website" />
            </div>
            <Input type="text" label="Email" />

            <div className={styles.controls}>
                <Button color="gray">Cancel</Button>
                <Button >Update Profile</Button>
            </div>
        </div>
    )
}

export default EditProfileForm