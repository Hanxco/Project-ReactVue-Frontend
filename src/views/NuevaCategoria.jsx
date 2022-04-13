import { useState } from 'react'
import { Fragment } from "react"
import FormularioCategoria from "../components/FormularioCategoria"
import useProductos from '../hooks/useProductos'
import { useNavigate } from 'react-router-dom'

const NuevaCategoria = () => {

  const [ categoriaSel, setCategoriasSel ] = useState(null);
  const { categorias, eliminarCategoria } = useProductos();

  const navigate = useNavigate();

  const handleClickDelete = (ele) => {
    if(confirm('¿Deseas eliminar este producto?')) {
      eliminarCategoria(ele._id)
    }
  }

  const handleClickEditar = (ele) => {
    setCategoriasSel(ele)
  }

  const handleNuevaCategoria = () => {
    setCategoriasSel(null)
  }
  
  return (
    <Fragment>
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3">
          <div class="flex mb-5">
            <h1 className="text-4xl font-black mb-5">Listado</h1>
              <button className='bg-green-500 p-3 hover:bg-green-700 transition-colors text-white uppercase font-bold block ml-12 text-center rounded-lg' 
                                    onClick={handleNuevaCategoria}>Nueva categoria</button>
          </div>
          {(
            categorias.map(categoria => (
              <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                  <table className="table-auto">
                    <tr>
                      <td>{categoria.orden} - {categoria.nombre}</td>
                      <td className="inline-block align-text-top">
                        <span className="inline-block align-text-top">
                          <button className='bg-orange-500 p-1 hover:bg-orange-700 transition-colors text-white uppercase font-bold block ml-12 text-center rounded-lg' 
                                  onClick={() => handleClickEditar(categoria)}>Editar</button>
                        </span>

                      </td>
                      <td>
                        <button className='bg-red-500 p-1 hover:bg-red-700 transition-colors text-white uppercase font-bold block ml-1 text-center rounded-lg' 
                                onClick={() => handleClickDelete(categoria)}>Eliminar</button>
                      </td>
                    </tr>
                  </table>
                </li>
              </ul>
            ))
          )}
        </div>
        <div className="row-span-2 col-span-2">
          {
            categoriaSel ? (
              <h1 className="text-4xl font-black mb-5">Editando Categoría</h1>
              ) : (
              <h1 className="text-4xl font-black mb-5">Crear nueva Categoría</h1>
            )
          }
          <div className="mt-10 flex flex-start">
            <FormularioCategoria categoria={categoriaSel} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default NuevaCategoria