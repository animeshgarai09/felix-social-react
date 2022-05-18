import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectUser } from '@slices/authSlice'
import useVerifyAuth from "@hooks/useVerifyAuth"
import { Spinner } from "@components"
const RestrictAuth = () => {
    const user = useSelector(selectUser)
    const isLoading = useVerifyAuth(user)
    const location = useLocation()
    return (
        isLoading
            ? <Spinner />
            : user.username
                ? <Navigate to="/home" state={{ from: location }} replace />
                : <Outlet />

    )
}

export default RestrictAuth