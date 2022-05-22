import styles from "../authentication.module.scss"
import { Input, Button, useToast } from "react-felix-ui"
import { Link } from 'react-router-dom';
import { FaChevronLeft } from "@icons"
import useInputHandler from "@hooks/useInputHandler"
import { useState, forwardRef } from "react"
import { Helmet } from "react-helmet"
import { useSignupMutation } from "@api/authApi";

const Signup = forwardRef((ref) => {

    const [signup, { isLoading }] = useSignupMutation()
    const toast = useToast()

    const { inputState, inputChange } = useInputHandler({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signup(inputState).unwrap()
            toast({
                status: "success",
                message: "Successfully logged in",
                duration: 2
            })
        } catch (err) {
            console.log(err)
            toast({
                status: "error",
                message: "Invalid Credentials",
                duration: 2
            })
        }
        // handleSignUp(inputState.name, inputState.email, inputState.password, setBtnState)
    }

    return (
        <div className={styles.signup}>
            <div className={styles.heading}>
                <Link to="/signin"><Button size="sm" variant="ghost" isRound={true} isTransform={false} ><FaChevronLeft /> Sign In</Button></Link>
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Full name" name="name" value={inputState.name} onChange={inputChange} />
                <Input type="text" label="Username" name="username" value={inputState.username} onChange={inputChange} />
                <Input type="email" label="Email" name="email" value={inputState.email} onChange={inputChange} />
                <Input type="password" label="Password" name="password" value={inputState.password} onChange={inputChange} />

                <div className={styles.form_buttons}>
                    <Button type="submit" isWide={true} isTransform={false} isLoading={isLoading} >Sign Up</Button>
                </div>
            </form>
        </div>
    )
})

export default Signup