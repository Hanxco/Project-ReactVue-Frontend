import { useContext } from 'react'
import ShopProvider from '../context/ShopProvider'

const useProductos = () => {
    return useContext(ShopProvider)
}

export default useProductos