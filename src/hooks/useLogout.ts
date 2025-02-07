import { userActions } from "@/store/userSlice"
import { signOut } from "next-auth/react"
import { useDispatch } from "react-redux"

export const useLogout = () => {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await signOut()
            dispatch(userActions.clearUser())
        } catch (error) {
            console.error('Error Logging out:', error)
        }
    }

    return handleLogout
}