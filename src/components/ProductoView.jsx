import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ModalAgregarProducto from './ModalAgregarProducto'

const PreviewProducto = ({producto, categories}) => {

    const [isOpen, setIsOpen] = useState(false);
    const {_id,  nombre, categoria, precio, imagen, stock} = producto
    
    const [categoryName, setCategoryName] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hoverImage, setHoverImage] = useState(false)
    
    useEffect( () => {
        var name = categories.get(Number(categoria))
        if (name != null) {
            setCategoryName(name.nombre);
        }
        setLoading(false)
    })

    return (
        <Fragment>
            {
                loading ? (
                    <h1>Loading ...</h1>
                ) : (
                    <div className="flex items-stretch">
                        <div className='grid grid-rows-1'>
                            <Link to={`${_id}`}>
                                <div className='bg-white hover:bg-slate-200 shadow mt-10 rounded-lg text-center'>
                                    <p className="text-xl uppercase hover:uppercase py-3">{nombre}</p>
                                    <span className='text-sm text-gray-500 uppercase'>
                                        {''} {categoryName}
                                    </span>
                                    <img className="w-22 md:w-32 lg:w-48 m-5" 
                                        onMouseOut={() => setHoverImage(false)}
                                        onMouseOver={() => setHoverImage(true)}
                                        style={{transition: '0.5s', transform: `${hoverImage ? 'scale(1.5,1.5)' : 'scale(1,1)'}`}}
                                        src={imagen} />
                                    <p><b>Unidades en stock:</b> {stock}</p>
                                    <h4><b>Precio: </b>{precio} €</h4>
                                </div>
                            </Link>
                            {
                                stock == 0 ? (
                                    <button className='bg-red-500 p-3 hover:bg-red-700 transition-colors text-white uppercase font-bold block mt-5 text-center rounded-lg'
                                        type='button'>Agotado</button>
                                ) : (
                                    <button className='bg-orange-500 p-3 hover:bg-orange-700 transition-colors text-white uppercase font-bold block mt-5 text-center rounded-lg'
                                        onClick={() => setIsOpen(true)}
                                        type='button'>Comprar ya</button>
                                )
                            }
                            <ModalAgregarProducto isOpen={isOpen} setIsOpen={setIsOpen} producto={producto} />
                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}

/*
    <Link to={`${_id}`} className='bg-gray-500 p-3 mr-3 hover:bg-gray-700 transition-colors text-white uppercase font-bold block mt-5 text-center rounded-lg'>
                                        Ver producto</Link>
                                        */
export default PreviewProducto