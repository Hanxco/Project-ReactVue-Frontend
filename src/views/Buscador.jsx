import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductos from '../hooks/useProductos';
import ProductoView from "../components/ProductoView"

const Buscador = () => {
  const params = useParams();

  const [ productoBusqueda, setProductoBusqueda ] = useState([])
  const [ category, setCategory ] = useState({});
  const [ categories, useCategories ] = useState(new Map())

  const { getProductosByCategory, 
          buscarCategoriaById,
          cargando } = useProductos()
 
  useEffect( () => {
    buscarCategoriaById(params.id)
      .then(function(result1) {
        getProductosByCategory(params.id)
        .then(function(result2) {
            var mapRes = new Map()
            mapRes.set(result1[0]._id, result1[0])
            useCategories(mapRes)
            setCategory(result1[0])
            setProductoBusqueda(result2)
          })
      })
  }, [params])

  if (cargando) return (
    <div class="flex justify-center items-center">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
  )

  return  (
      <Fragment>
        <h1 className="text-4xl font-black">{category.nombre}</h1>
        <div className="grid grid-flow-row-dense xl:grid-cols-6 md:grid-cols-4 xs:grid-cols-1 gap-4 justify-items-center place-content-center">
          {
            productoBusqueda.length ? 
              productoBusqueda.map(producto => (
                <ProductoView 
                    key={producto._id}
                    producto={producto}
                    categories={categories}
                />
              ))
            : <p className="text-center text-gray-600 uppercase p-5">No hay ningún producto</p>
          }
        </div>
      </Fragment>
    )

}

export default Buscador