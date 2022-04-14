import { Fragment } from "react"
import FormularioProducto from "../components/FormularioProducto"
import useProductos from '../hooks/useProductos'
import { useState } from 'react'

const NuevoProducto = () => {

  const [ productoSel, setProductoSel ] = useState();
  const { productos, eliminarProducto } = useProductos();
  const [hoverImage, setHoverImage] = useState(false)

  console.log(productoSel)
  
  const handleClickDelete = (ele) => {
    if(confirm('¿Deseas eliminar este producto?')) {
      eliminarProducto(ele._id)
    }
  }

  const handleClickEditar = (ele) => {
    setProductoSel(ele)
  }

  const handleNuevoProducto = () => {
    setProductoSel(null)
  }
    
  return (
    <Fragment>
      <div className="grid grid-rows-2 grid-flow-col gap-4 xs:grid-col-1 justify-items-center">
        <div className="row-span-2">
          <div className="flex mb-5">
              <h1 className="text-4xl font-black mb-5">Listado</h1>
                <button className='bg-green-500 p-3 hover:bg-green-700 transition-colors text-white uppercase font-bold block ml-12 text-center rounded-lg' 
                                      onClick={handleNuevoProducto}>Nuevo producto</button>
          </div>
          {(
            productos.map(producto => (
              <ul key={producto._id} className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                  <table className="table-auto">
                    <tr>
                      <td>{producto._id} - {producto.nombre}</td>
                      <td className="inline-block align-text-top">
                        <span className="inline-block align-text-top">
                          <button className='bg-orange-500 p-1 hover:bg-orange-700 transition-colors text-white uppercase font-bold block ml-12 text-center rounded-lg' 
                                  onClick={() => handleClickEditar(producto)}>Editar</button>
                        </span>

                      </td>
                      <td>
                        <button className='bg-red-500 p-1 hover:bg-red-700 transition-colors text-white uppercase font-bold block ml-1 text-center rounded-lg' 
                                onClick={() => handleClickDelete(producto)}>Eliminar</button>
                      </td>
                    </tr>
                  </table>
                </li>
              </ul>
            ))
          )}
        </div>
        <div className="row-span-3 col-span-3">
          {
            productoSel ? (
              <h1 className="text-4xl font-black mb-5">Editando Producto</h1>
              ) : (
              <h1 className="text-4xl font-black mb-5">Crear nuevo Producto</h1>
            )
          }
          <div className="mt-10 flex stretch">
              <FormularioProducto producto={productoSel} />
          </div>
        </div>
        <div className="row-span-2 col-span-2">
          {
            productoSel ? (
              <div className="mt-10 flex flex-start">
                <img className="w-22 md:w-32 lg:w-60 m-5" 
                    onMouseOut={() => setHoverImage(false)}
                    onMouseOver={() => setHoverImage(true)}
                    style={{transition: '0.5s', transform: `${hoverImage ? 'scale(1.5,1.5)' : 'scale(1,1)'}`}}
                    src={productoSel.imagen} />
              </div>
            ) : null
          }
        </div>
      </div>
    </Fragment>
  )
}

export default NuevoProducto