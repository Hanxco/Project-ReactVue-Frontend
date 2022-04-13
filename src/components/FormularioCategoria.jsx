import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProductos from '../hooks/useProductos'
import Alerta from './Alerta'

const FormularioCategoria = (categoria) => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [orden, setOrden] = useState('')

    const params = useParams();
    const { mostrarAlerta, alerta, categorias, submitCategorias } = useProductos();

    useEffect(() => {
        if( categoria.categoria == null ) {
            setId(null)
            setNombre('')
            setDescripcion('')
            setOrden('')
        } else {
            setId(categoria.categoria._id)
            setNombre(categoria.categoria.nombre)
            setDescripcion(categoria.categoria.descripcion)
            setOrden(categoria.categoria.orden)
        }
    }, [categoria])


    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, orden].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }
        const _id = id ? id : null;
        await submitCategorias({ _id, nombre, descripcion, orden})

        setId(null)
        setNombre('')
        setDescripcion('')
        setOrden('')
    }

    const { msg } = alerta

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit} >
                {msg && <Alerta alerta={alerta} />}

                <div className='mb-5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombre" >Nombre Categoría</label>
                    <input
                        id="nombre"
                        type="text"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre de la categoría"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>

                <div className='mb-5'>
                    <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion" >Descripción</label>
                    <textarea
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripción de la categoría"
                        value={descripcion}
                        id="descripcion"
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="categoria-input">Orden</label>
                    <input
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder='Orden'
                        id="orden"
                        value={orden}
                        onChange={e => setOrden(e.target.value)} />
                </div>

                <input
                    type="submit"
                    value={id ? 'Actualizar Categoria': 'Crear Categoria'}
                    className='bg-orange-600 hover:bg-orange-700 transition-colors w-full p-3 uppercase font-bold text-white rounded cursor-pointer'
                />
        </form>
    )
}

export default FormularioCategoria