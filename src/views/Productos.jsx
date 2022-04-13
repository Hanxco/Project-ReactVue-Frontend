import { Fragment, useEffect } from 'react'
import useProductos from "../hooks/useProductos"
import ProductoView from "../components/ProductoView"
import Alerta from "../components/Alerta"

const Productos = () => {
  const { productos, alerta } = useProductos()
  const { msg } = alerta

  return (
    <Fragment>
      <h1 className="text-4xl font-black">Todos los productos</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="grid grid-flow-row-dense xl:grid-cols-6 md:grid-cols-4 xs:grid-cols-1 gap-4 justify-items-center place-content-center">
        {
          productos.length ? 
            productos.map(producto => (
              <ProductoView 
                  key={producto._id}
                  producto={producto}
              />
            ))
          : <p className="text-center text-gray-600 uppercase p-5">No hay ningún producto</p>
        }
      </div>
    </Fragment>
  )
}

export default Productos