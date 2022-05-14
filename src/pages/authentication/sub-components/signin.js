
import styles from "../authentication.module.scss"
import { Input, Button } from "react-felix-ui"
import { Link, useLocation } from 'react-router-dom'
import { FaChevronRight } from "@icons"
import useInputHandler from "@hooks/useInputHandler"
import { useState } from "react"
// import { useAuth } from "@providers/auth-provider"
import { Helmet } from "react-helmet"

const Signin = ({ signInRef }) => {

    // const { handleSignIn } = useAuth()

    const location = useLocation()
    /* Check redirection path */
    const from = location.state?.from?.pathname || "/home"
    /* Submit button state */
    const [submitState, setSubmitState] = useState(false)
    const [guestState, setGuestState] = useState(false)

    /* Form input handler from useInputHandler hook*/
    const { inputState, inputChange } = useInputHandler({
        email: "",
        password: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitState(true)
        // handleSignIn(inputState.email, inputState.password, from, setSubmitState)
    }

    const handleGuest = () => {
        setGuestState(true)
        // handleSignIn("animeshgarai09@gmail.com", "testing1234", from, setGuestState)

    }

    return (
        <>
            <Helmet>
                <title>Sign in| Felix TV</title>
            </Helmet>
            <div className={styles.signin}>
                <div className={styles.heading}>
                    <h2>Sign In</h2>
                    <Link to="/signup"><Button size="sm" variant="ghost" isRound={true} isTransform={false} >Sign Up <FaChevronRight /> </Button></Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input type="email" label="Email" name="email" value={inputState.email} Fref={signInRef} onChange={inputChange} />
                    <Input type="password" label="Password" name="password" value={inputState.password} onChange={inputChange} />

                    <div className={styles.form_buttons}>
                        <Button type="submit" isWide={true} isTransform={false} isLoading={submitState}>Sign in</Button>
                        <Button theme="gray" onClick={handleGuest} isWide={true} isTransform={false} isLoading={guestState} className={styles.guest}>Sign in as a guest</Button>
                        <a href="#" className="text-center"> Forgot password?</a>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Signin