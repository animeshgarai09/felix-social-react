import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

// import { useAuth } from '@providers/auth-provider'
const RestrictAuth = () => {
    // const { UserState } = useAuth()

    const location = useLocation()
    // return (
    //     UserState._id
    //         ? <Navigate to="/" state={{ from: location }} replace />
    //         : <Outlet />

    // )
    return (<Outlet />)
}

export default RestrictAuth