
import styles from "../authentication.module.scss"
import { Input, Button, useToast } from "react-felix-ui"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaChevronRight } from "@icons"
import useInputHandler from "@hooks/useInputHandler"
import { useState } from "react"
import { useSigninMutation } from "@api/authApi"

const Signin = ({ signInRef }) => {
    const [signin] = useSigninMutation()
    const location = useLocation()
    const toast = useToast()
    const navigate = useNavigate()

    /* Check redirection path */
    const from = location.state?.from?.pathname || "/home"
    /* Submit button state */
    const [submitState, setSubmitState] = useState(false)
    const [guestState, setGuestState] = useState(false)

    /* Form input handler from useInputHandler hook*/
    const { inputState, inputChange } = useInputHandler({
        usernameEmail: "",
        password: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitState(true)
        try {
            await signin(inputState).unwrap()

            setSubmitState(false)
            toast({
                status: "success",
                message: "Successfully logged in",
                duration: 2
            })
            console.log("🚀 ~ file: signin.js ~ line 41 ~ handleSubmit ~ from", from)
            navigate(from, { replace: true })
        } catch (err) {
            console.log("🚀 ~ file: signin.js ~ line 43 ~ handleSubmit ~ err", err)
            setSubmitState(false)
            toast({
                status: "error",
                message: "Invalid Credentials",
                duration: 2
            })
        }
    }

    const handleGuest = async () => {
        setGuestState(true)
        try {
            await signin({ usernameEmail: "animeshgarai09@gmail.com", password: "12345678" }).unwrap()
            setGuestState(false)
            toast({
                status: "success",
                message: "Successfully logged in",
                duration: 2
            })
            navigate(from, { replace: true })
        } catch (err) {
            console.log("🚀 ~ file: signin.js ~ line 65 ~ handleGuest ~ err", err)
            setGuestState(false)
            toast({
                status: "error",
                message: "Invalid Credentials",
                duration: 2
            })
        }
    }

    return (
        <div className={styles.signin}>
            <div className={styles.heading}>
                <h2>Sign In</h2>
                <Link to="/signup"><Button size="sm" variant="ghost" isRound={true} isTransform={false} >Sign Up <FaChevronRight /> </Button></Link>
            </div>
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Username or Email" name="usernameEmail" value={inputState.usernameEmail} Fref={signInRef} onChange={inputChange} />
                <Input type="password" label="Password" name="password" value={inputState.password} onChange={inputChange} />

                <div className={styles.form_buttons}>
                    <Button type="submit" isWide={true} isTransform={false} isLoading={submitState}>Sign in</Button>
                    <Button color="gray" onClick={handleGuest} isWide={true} isTransform={false} isLoading={guestState} className={styles.guest}>Sign in as a guest</Button>
                    <a href="#" className="text-center"> Forgot password?</a>
                </div>
            </form>
        </div>
    )
}

export default Signin