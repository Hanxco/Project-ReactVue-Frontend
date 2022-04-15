import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const AdminLayout = () => {

    const { auth, cargando } = useAuth();

    if (cargando) return (
        <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (
        <Fragment>
            <div className='bg-gray-100'>
                {auth != null ? 
                (
                    <div className='bg-gray-100'>
                        <header className="px-4 py-5 bg-white border-b">
                            <div className="md:flex md:justify-between">
                                <Link to="/">
                                    <h2 className="text-4xl text-orange-600 font-black text-center mb-5 md:mb-0">Custom Shop</h2>
                                </Link>
                                <div className='flex flex-col md:flex-row items-center gap-4'>
                                    <h2 className="text-3xl text-orange-600 font-black text-center mb-5 md:mb-0">Administrador</h2>
                                    <Link className='bg-stone-600 hover:bg-orange-700 transition-colors w-full font-bold block p-3 mt-5 text-white text-center rounded-lg uppercase' 
                                        to="/">
                                        Volver
                                    </Link>
                                </div>
                            </div>
                        </header>

                        <div className='md:flex md:min-h-screen'>
                            <main className='p-10 flex-1 '>
                                <Outlet />
                            </main>
                        </div>
                    </div>
                ) : <Navigate to="/" />}
            </div>
        </Fragment>
    )
}

export default AdminLayout