import styles from './edit-profile-form.module.scss'
import { Input, Button, useToast } from 'react-felix-ui'
import useInputHandler from "@hooks/useInputHandler"
import { useEditUserDetailsMutation } from '@api/userApi'

const EditProfileForm = ({ userData, onClose }) => {

    const [editUserDetails, { isLoading }] = useEditUserDetailsMutation()
    const toast = useToast()
    /* Form input handler from useInputHandler hook*/
    const { inputState, inputChange } = useInputHandler(userData)

    const handleEditUserDetails = async (event) => {
        event.preventDefault()
        try {
            await editUserDetails(inputState).unwrap()
            onClose()
            toast({
                status: "success",
                message: "Profile is updated",
                duration: 2
            })
        } catch (err) {
            switch (err.status) {
                case 404:
                    toast({
                        status: "error",
                        message: "Sign in to continue",
                        duration: 2
                    })
                    break
                case 422:
                    toast({
                        status: "error",
                        message: "Email is already registered",
                        duration: 2
                    })
                    break
                default:
                    console.log(err)
                    toast({
                        status: "error",
                        message: "Something went wrong",
                        duration: 2
                    })
            }

        }

    }

    return (
        <form onSubmit={handleEditUserDetails} className={styles.container}>
            <Input type="text" label="Name" value={inputState.name} onChange={inputChange} name="name" placeholder="(e.g) Animesh Garai" />
            <Input type="textarea" height="100" value={inputState.bio} name="bio" onChange={inputChange} label="Short Bio" placeholder="Write a short bio about you..." />
            <div className={styles.flex}>
                <Input type="text" label="Location" value={inputState.location} name="location" onChange={inputChange} placeholder="(e.g) Kolkata " />
                <Input type="text" label="Website" value={inputState.website} name="website" onChange={inputChange} placeholder="(e.g) www.website.com" />
            </div>
            <Input type="text" label="Email" value={inputState.email} name="email" onChange={inputChange} placeholder="(e.g) animeshgarai09@gmail.com" />

            <div className={styles.controls}>
                <Button color="gray">Cancel</Button>
                <Button type="submit" isLoading={isLoading}>Update Profile</Button>
            </div>
        </form>
    )
}

export default EditProfileForm