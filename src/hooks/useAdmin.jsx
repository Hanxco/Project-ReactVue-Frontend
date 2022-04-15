import useAuth from "./useAuth";

const useAdmin = () => {
    const { auth } = useAuth()
    return auth != null && auth.profile == "admin"
}

export default useAdmin