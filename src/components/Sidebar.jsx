import useAuth from '../hooks/useAuth'
import CestaCompra from './CestaCompra'

const Sidebar = () => {

  const { auth } = useAuth()

  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/5 px-5 py-10'>
      
      { auth != null ? (
          <p className='text-xl font-bold'>Hola: {auth.email}</p>
        ) : null
      }

      <CestaCompra />
    </aside>
  )

}

export default Sidebar