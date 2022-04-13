import {useState } from 'react'
import { Link } from 'react-router-dom'
import useProductos from '../hooks/useProductos'
import useAuth from '../hooks/useAuth'
import Busqueda from './Busqueda'
import useAdmin from '../hooks/useAdmin';

const Header = () => {
    const { handleBuscador, cerrarSesionProductos, categorias } = useProductos()
    
    const { auth, cerrarSesionAuth } = useAuth()
    const [ menuAdmin, setMenuAdmin ] = useState(false);
    const [ menuCategorias, setMenuCategorias ] = useState(false);

    const admin = useAdmin()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProductos()
        localStorage.removeItem('token')
    }

    const handleAdmin = () => {
        setMenuAdmin(!menuAdmin);
    }

    const handleCategorias = () => {
        setMenuCategorias(!menuCategorias);
    }

  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <Link to="/">
                <h2 className="text-4xl text-orange-600 font-black text-center mb-5 md:mb-0">Custom Shop</h2>
            </Link>
            <div className='flex flex-col md:flex-row items-center gap-4'>
                <button className='font-bold uppercase hover:underline decoration-orange-500' type="button" onClick={handleBuscador}>Buscar Productos</button>

                <div className="relative inline-block text-left">
                    <button className='font-bold uppercase hover:underline decoration-orange-500' 
                            type="button" onClick={handleCategorias} >Categorías</button>
                    { menuCategorias ? 
                    (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" 
                            role="menu" id="menuCategorias" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1" role="none">
                                {
                                    categorias.map(categoria => (
                                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                                            <Link className='font-bold uppercase hover:underline decoration-orange-500' to="crear-producto">{categoria.nombre}</Link>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    ) : ''}
                </div>

                <Link className='font-bold hover:underline decoration-orange-500 uppercase' to="/">Todos los productos</Link>
                
                {
                    admin ? (
                        <div className="relative inline-block text-left">
                            <div>
                                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
                                        type="button" onClick={handleAdmin}
                                        id="menu-button" 
                                        aria-expanded="true" aria-haspopup="true">Administrador</button>
                            </div>
                            { menuAdmin ? (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" 
                                    role="menu" id="menuAdmin"
                                    aria-orientation="vertical" 
                                    aria-labelledby="menu-button" 
                                    tabindex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                                            <Link className='font-bold uppercase hover:underline decoration-orange-500' to="admin/crear-producto">Gestionar productos</Link>
                                        </a>
                                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">
                                            <Link className='font-bold uppercase hover:underline decoration-orange-500' to="admin/crear-categoria">Gestionar categorías</Link>
                                        </a>
                                    </div>
                                </div>
                            ) : ''}
                        </div>
                    ) : null
                }

                {
                    auth == null ? (
                        <Link to="login">
                            <button className='text-white text-sm bg-orange-600 p-3 rounded-md uppercase font-bold' type="button" >Iniciar Sesión</button>
                        </Link>
                    ) : (
                        <button className='text-white text-sm bg-orange-600 p-3 rounded-md uppercase font-bold' type="button" onClick={cerrarSesionAuth} >Cerrar Sesión</button>
                    )
                }

                <Busqueda />
            </div>
        </div>
    </header>
  )
}

export default Header