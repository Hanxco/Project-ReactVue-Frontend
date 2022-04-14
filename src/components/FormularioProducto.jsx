import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProductos from '../hooks/useProductos'
import Alerta from './Alerta'

const FormularioProducto = (producto) => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precio, setPrecio] = useState('')
    const [imagen, setImagen] = useState('')
    const [stock, setStock] = useState('')

    const params = useParams();
    const { mostrarAlerta, alerta, submitProducto, proyecto, productos, categorias } = useProductos();

    useEffect(() => {
        if( producto.producto == null ) {
            setId(null)
            setNombre('')
            setDescripcion('')
            setPrecio('')
            setCategoria('')
            //setImagen('')
            setStock('')
        } else {
            setId(producto.producto._id)
            setNombre(producto.producto.nombre)
            setDescripcion(producto.producto.descripcion)
            setPrecio(producto.producto.precio)
            setCategoria(producto.producto.categoria)
            //setImagen(producto.producto.imagen)
            setStock(producto.producto.stock)
        }
    }, [producto])


    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, categoria, precio].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }

        const _id = id ? id : null;
        await submitProducto({ _id, nombre, descripcion, imagen, precio, categoria, stock })

        setId(null)
        setNombre('')
        setDescripcion('')
        setImagen('')
        setPrecio('')
        setCategoria('')
    }

    const { msg } = alerta

    return (
        <form className="bg-white py-10 px-5 md:w-100 rounded-lg shadow"
            onSubmit={handleSubmit} >
                {msg && <Alerta alerta={alerta} />}

                <div className='mb-5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombre" >Nombre Producto</label>
                    <input
                        id="nombre"
                        type="text"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del producto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>

                <div className='mb-5'>
                    <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion" >Descripción</label>
                    <textarea
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripción del producto"
                        value={descripcion}
                        id="descripcion"
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="categoria-input">Categoría</label>
                    <select className="form-select appearance-none block w-full px-3
                                    py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300 rounded transition
                                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                            aria-label="Default select example"
                            onChange={e => setCategoria(e.target.value)}
                            value={categoria}
                            id="categoria"
                            placeholder='Categoría'>
                        <option selected>Selecciona una categoría</option>
                        {
                            (
                                categorias.map(categoria => (
                                    <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div className='mb-5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="categoria-input">Imagen</label>
                    <input
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="file"
                        placeholder='Imagen'
                        id="imagen"
                        value={imagen}
                        onChange={e => setImagen(e.target.value)} />
                </div>

                <div className='mb-5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="cliente" >Precio unidad</label>
                    <input
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Precio por unidad"
                        type="number"
                        id="precio-unit"
                        value={precio}
                        onChange={e => setPrecio(e.target.value)} />
                </div>

                <div className='mb-5'>
                    <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="cliente" >Unidades en stock</label>
                    <input
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Unidades en stock"
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={e => setStock(e.target.value)} />
                </div>

                <input
                    type="submit"
                    value={id ? 'Actualizar Producto': 'Crear Producto'}
                    className='bg-orange-600 hover:bg-orange-700 transition-colors w-full p-3 uppercase font-bold text-white rounded cursor-pointer'
                />
        </form>
    )
}

export default FormularioProducto