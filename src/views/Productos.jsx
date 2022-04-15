import { Fragment, useState, useEffect } from 'react'
import useProductos from "../hooks/useProductos"
import ProductoView from "../components/ProductoView"
import Alerta from "../components/Alerta"
import { useParams } from 'react-router-dom'

const Productos = () => {

  const { productos, alerta, buscarCategorias } = useProductos()
  const { msg } = alerta
  const params = useParams();

  const [categories, useCategories] = useState(new Map())
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    buscarCategorias()
      .then(function(result) {
        useCategories(result)
        setLoading(false)
      })
  }, [params])

  return (
    <Fragment>
      {msg && <Alerta alerta={alerta} />}
      {
        loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div>
            <h1 className="text-4xl font-black">Todos los productos</h1>
            <div className="grid grid-flow-row-dense xl:grid-cols-6 md:grid-cols-4 xs:grid-cols-1 gap-4 justify-items-center place-content-center">
              {
                productos.length ? 
                  productos.map(producto => (
                    <ProductoView 
                        key={producto._id}
                        producto={producto}
                        categories={categories}
                    />
                  ))
                : <p className="text-center text-gray-600 uppercase p-5">No hay ningún producto</p>
              }
            </div>
          </div>
        )
      }
    </Fragment>
  )
}

export default Productos