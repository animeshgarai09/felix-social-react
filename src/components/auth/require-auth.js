import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@providers/auth-provider'
const RequireAuth = () => {
    const { UserState } = useAuth()
    const location = useLocation()
    return (
        UserState._id
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />

    )
}

export default RequireAuth