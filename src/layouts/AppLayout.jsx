import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Fragment } from 'react'

const AppLayout = () => {

    const { auth, cargando } = useAuth();

    if (cargando) return (
        <div className="flex justify-center items-center">
            <span className="visually-hidden mt-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="spinner-border animate-spin w-20 h-20 mb-5" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/>
                </svg>
                <h4 className="font-medium leading-tight text-2xl mt-0 mb-2 text-orange-600 mt-20">Cargando... </h4>
            </span>
        </div>
    )

    return (
        <Fragment>
            <div className='bg-gray-100'>
                <Header />
                <div className='md:flex md:min-h-screen'>
                    <main className='p-10 flex-1 '>
                        <Outlet />
                    </main>
                    <Sidebar />
                </div>
            </div>
        </Fragment>
    )
}

export default AppLayout

/*
{auth != null ? 
    (
        <div className='bg-gray-100'>
            <Header />

            <div className='md:flex md:min-h-screen'>
                <Sidebar />

                <main className='p-10 flex-1 '>
                    <Outlet />
                </main>
            </div>
        </div>
    ) : <Navigate to="/" />}
*/