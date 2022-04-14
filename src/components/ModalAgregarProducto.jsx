import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProductos from '../hooks/useProductos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const CANTIDAD = ['1', '2', '3']
const TALLA = ['XS', 'S', 'M', 'L', 'XL']

const ModalAgregarProducto = ({ isOpen, setIsOpen, producto }) => {
    const unitsAvailable = []
    
    for (let i=1; i <= producto.stock; i++) {
        unitsAvailable.push(i);
    }
    const [id, setId] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [talla, setTalla] = useState('')

    const { mostrarAlerta, alerta, agregarProductoCesta } = useProductos();

    const handleSubmit = async e => {
        e.preventDefault();

        if([cantidad, talla].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        const articulo = { 
            _id: producto._id, 
            nombre: producto.nombre, 
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad,
            talla: talla
        };
        await agregarProductoCesta(articulo)
        setId('')
        setCantidad('')
        setTalla('')
        setIsOpen(false)
    }

    const { msg } = alerta

    return (
        <Transition.Root show={isOpen} as={Fragment} open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        enter="ease-out duration-300" >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => setIsOpen(false)}>
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {id ? 'Editar Tarea': 'Selecciona producto'}
                                    </Dialog.Title>

                                    {msg && <Alerta alerta={alerta} />}

                                    <form className='my-10' onSubmit={handleSubmit}>
                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='cantidad'>
                                               Cantidad
                                            </label>
                                            <select
                                                id="cantidad"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={cantidad}
                                                onChange={e => setCantidad(e.target.value)} >
                                                <option value="">-- Seleccionar --</option>
                                                {
                                                    unitsAvailable.map( opcion => (
                                                        <option key={opcion}>{opcion}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='talla'>
                                               Talla
                                            </label>
                                            <select
                                                id="talla"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={talla}
                                                onChange={e => setTalla(e.target.value)} >
                                                <option value="">-- Seleccionar --</option>
                                                {
                                                    TALLA.map( opcion => (
                                                        <option key={opcion}>{opcion}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <input className='bg-orange-600 hover:bg-orange-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                                            type="submit" value='Añadir a la cesta' />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
  };

export default ModalAgregarProducto