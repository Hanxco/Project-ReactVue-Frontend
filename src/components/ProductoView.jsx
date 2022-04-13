import { Fragment } from 'react';
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProductos from '../hooks/useProductos'
import ModalAgregarProducto from './ModalAgregarProducto'

const PreviewProducto = ({producto}) => {

    const { auth } = useAuth()
    const { handleModalTarea } = useProductos()

    const {_id,  nombre, categoria, precio, imagen, stock} = producto

    return (
        <Fragment>
            <div className="flex items-stretch">
                <div className='grid grid-rows-1'>
                    <div>
                        <div className='bg-white shadow mt-10 rounded-lg text-center'>
                            <p className="text-xl uppercase hover:uppercase py-3">{nombre}</p>
                            <span className='text-sm text-gray-500 uppercase'>
                                {''} {categoria}
                            </span>
                            <img className="w-22 md:w-32 lg:w-48 m-5" src={imagen} />
                            <p><b>Unidades en stock:</b> {stock}</p>
                            <h4><b>Precio: </b>{precio} €</h4>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-stretch">
                            <div>
                                <Link to={`${_id}`} className='bg-gray-500 p-3 mr-3 hover:bg-gray-700 transition-colors text-white uppercase font-bold block mt-5 text-center rounded-lg'>
                                    Ver producto</Link>
                            </div>
                            <div>
                                <button
                                    onClick={ handleModalTarea }
                                    type='button'
                                    className='bg-orange-500 p-3 hover:bg-orange-700 transition-colors text-white uppercase font-bold block mt-5 text-center rounded-lg'
                                >Comprar ya</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalAgregarProducto />
        </Fragment>
    )
}

export default PreviewProducto