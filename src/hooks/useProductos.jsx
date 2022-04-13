import { useContext } from 'react'
import ProductosProvider from '../context/ProductosProvider'

const useProductos = () => {
    return useContext(ProductosProvider)
}

export default useProductos