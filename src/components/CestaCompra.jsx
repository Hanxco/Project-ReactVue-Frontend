import { Fragment, useState } from 'react'
import useProductos from "../hooks/useProductos"
import useAuth from '../hooks/useAuth'

const CestaCompra = () => {

  const { subtotal,
          mostrarAlerta,
          cesta, 
          editarProductoCesta, 
          borrarProductoCesta, 
          restarProductoSubtotal,
          finalizarPedido } = useProductos()

  const { isLogged } = useAuth()

  const handleRemove = async e => {
    const article = e;
    article.cantidad = e.cantidad - 1;
    if (article.cantidad == 0) {
      borrarProductoCesta(article)
    } else {
      editarProductoCesta(article);
    }
    restarProductoSubtotal(article)
  }

  const handlePedido = async e => {
    isLogged()
      .then(function(res) {
        if (cesta.length > 0 && res) {   
          finalizarPedido()
        } else if (cesta.length == 0) {
          mostrarAlerta({
            msg: 'Necesita agregar productos a su cesta',
            error: 'true'
          })
        } else if (!res) {
          mostrarAlerta({
            msg: 'Inicie sesión para continuar su pedido',
            error: 'true'
          })
        }
      })
      .catch(function() {
        mostrarAlerta({
          msg: 'Categoría Actualizada Correctamente',
          error: 'true'
        })
      })
  }

  return (
    <Fragment>
      <div className="flex h-full flex-col shadow-xl" >
        <div className="flex-1 py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Cesta de la compra</h2>
            <div className="ml-3 flex h-7 items-center">
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root overflow-y-scroll p-5" style={{height : "32rem"}}>
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {
                  cesta.length ? 
                    cesta.map(articulo => (
                      <li key={'article-' + articulo._id + articulo.talla} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img className="w-20 md:w-20 lg:w-20" src={articulo.imagen} />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{articulo.nombre}</a>
                              </h3>
                              <p className="ml-4">{articulo.precio}€</p>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500"><b>Talla: </b>{articulo.talla}</p>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Cantidad: {articulo.cantidad}</p>
                            <div className="flex">
                              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => handleRemove(articulo)}>Remove</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  : <p className="text-center text-gray-600 uppercase p-5">No hay ningún producto</p>
                }
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{subtotal} €</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Gastos de envío son calculados previo al pago.</p>
            <div className="mt-6">
              <a className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                onClick={handlePedido}>Finalizar pedido</a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CestaCompra

/*
*/