import authCookieHandler from "@global/js/authCookieHandler"
import { useVerifyMutation } from "@api/authApi";
import { useState, useEffect } from 'react'

const useVerifyAuth = (user) => {
    const [isLoading, setLoading] = useState(true)
    const cookieHandler = authCookieHandler()
    const { token } = cookieHandler.getUserDetails()
    const [verify] = useVerifyMutation()

    const handleVerify = async () => {
        try {
            await verify(token).unwrap()
        } catch (err) {
            console.log("🚀 ~ file: useVerifyAuth.js ~ line 15 ~ handleVerify ~ err", err)
        }
        setLoading(false)
    }
    useEffect(() => {
        if (!user.username && token) {
            handleVerify()
        } else {
            setLoading(false)
        }
    }, [])

    return isLoading
}

export default useVerifyAuth