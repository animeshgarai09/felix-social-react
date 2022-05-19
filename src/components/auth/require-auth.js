import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectUser } from '@slices/authSlice'
import useVerifyAuth from "@hooks/useVerifyAuth"
import { Spinner } from "@components"

const RequireAuth = () => {
    const user = useSelector(selectUser)
    const isLoading = useVerifyAuth(user)
    const location = useLocation()
    return (
        isLoading
            ? <Spinner />
            : user.username
                ? <Outlet />
                : <Navigate to="/signin" state={{ from: location }} replace />

    )
}

export default RequireAuth