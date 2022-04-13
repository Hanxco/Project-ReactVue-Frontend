import useProductos from "./useProductos";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { producto } = useProductos()
    const { auth } = useAuth()
    return auth != null && auth.profile == "admin"
}

export default useAdmin