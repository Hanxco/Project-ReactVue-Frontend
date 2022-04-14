import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket;

const ProductosContext = createContext();

const ProductosProvider = ({children}) => {
    
    const [productos, setProductos] = useState([
        { _id:1, nombre: "Normal vs Paranormal", categoria: "1", descripcion: "Camiseta de mangas cortas con ilustración Normal vs Paranormal en campana de Gauss",precio: 50, imagen: '/images/1.jpg', stock: 10},
        { _id:2, nombre: "Popcorn evolution", categoria: "1", descripcion: "Otra gran diseño de mano de Popcorn Collections", precio: 20, imagen: '/images/5.jpg', stock: 13},
        { _id:3, nombre: "Lana Blanca", categoria: "4", descripcion: "Un abrigo confortable y clásico, con el que nunca fallaras.", precio: 20, imagen: '/images/abrigo2.jpg', stock: 13},
        { _id:4, nombre: "Science", categoria: "1", descripcion: "La primera camiseta de nuesta colección de fanáticos de la ciencia", precio: 20, imagen: '/images/4.jpg', stock: 25},
        { _id:5, nombre: "Trekking Pants", categoria: "3", descripcion: "El pantalón más versatil para ir a la montaña", precio: 49, imagen: '/images/pantalon2.jpg', stock: 5},
        { _id:6, nombre: "Trango Pants", categoria: "3", descripcion: "Pantalones marron Caki de color marrón, resistentes y duraderos.", precio: 36, imagen: '/images/pantalon1.jpg', stock: 7},
        { _id:7, nombre: "Abrigo tupido", categoria: "4", descripcion: "Para las mañanas y noches más frías, de lana virgen.", precio: 89, imagen: '/images/abrigo1.jpg', stock: 3},
        { _id:8, nombre: "Vineyard Vine", categoria: "1", descripcion: "Luce el bonito logo de Vineyard Vine en una camiseta blanca", precio: 15, imagen: '/images/2.jpg', stock: 10},
        { _id:9, nombre: "World #0 Programmer", categoria: "1", descripcion: "El paquete de 6 camisetas básicas te permite expresar completamente tu vibrante personalidad con tres opciones de escala de grises.", precio: 15, imagen: '/images/3.jpg', stock: 20},
        { _id:10, nombre: "Camisa vaquera", categoria: "2", descripcion: "Camisa vaquera 100% algodón, con broches en nacar falso", precio: 18, imagen: '/images/camisa2.jpeg', stock: 9},
        { _id:11, nombre: "Camisa sencilla", categoria: "2", descripcion: "Camisa verde Scalpers", precio: 25, imagen: '/images/camisa1.jpg', stock: 2},
    ]);
    const [tallas, setTallas] = useState(['XS', 'S', 'M', 'L', 'XL']);
    const [categorias, setCategorias] = useState([
        { _id:1, nombre: "Camisetas", descripcion: "", orden: "1" },
        { _id:2, nombre: "Camisas", descripcion: "", orden: "2" },
        { _id:3, nombre: "Pantalones", descripcion: "", orden: "3" },
        { _id:4, nombre: "Abrigos", descripcion: "", orden: "4" },
        { _id:5, nombre: "Sudaderas", descripcion: "", orden: "5" },
        { _id:6, nombre: "Calzado", descripcion: "", orden: "6" },
        { _id:7, nombre: "Ropa interior", descripcion: "", orden: "7" },
        { _id:8, nombre: "Pijamas", descripcion: "", orden: "8" }
    ]);
    const [ alerta, setAlerta ] = useState({});
    const [ producto, setProducto ] = useState({});
    const [ cargando, setCargando ] = useState(false);
    const [ modalFormularioTarea, setModalFormularioTarea  ] = useState(false)
    const [ tarea, setTarea ] = useState({})
    const [ modalEliminarTarea, setModalEliminarTarea  ] = useState(false)
    const [ buscador, setBuscador ] = useState(false)

    // Cesta de la compra
    const [ cesta, setCesta ] = useState([])
    const [ subtotal, setSubtotal ] = useState(0)
    /*const [ cesta, setCesta ] = useState([
        { _id:1, productId: 1, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:2, productId: 2, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:3, productId: 2, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:4, productId: 2, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:5, productId: 3, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'}
    ]);*/

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
            } catch (error) {
                (error)
            }
        }
        obtenerProductos()
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProducto = async producto => {
        if(producto._id == null) {
            await nuevoProducto(producto)
        } else {
            await editarProducto(producto)
        }
    }

    const editarProducto = async producto => {
        try {
            var productosArr = productos;
            for (var i = 0 ; i < productosArr.length; i++) {
                if (productosArr[i]._id == producto._id) {
                    productosArr[i] = producto
                }
            }
            setProductos(productosArr)

            setAlerta({
                msg: 'Producto Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            (error)
        }
    }

    const nuevoProducto = async producto => {
        try {
            const last = productos[productos.length - 1];
            const _id = last._id + 1;
            producto._id = _id;
            setProductos([...productos, producto])
            setAlerta({
                msg: 'Producto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            (error)
        }
    }

    const obtenerProducto = async id => {
        setCargando(true)
        try {
            var project;
            for (var i=1; i<productos.length+1; i++) {
                if (i == id) {
                    project = productos[i-1];
                }
            }
            setProducto(project)
            setAlerta({})
        } catch (error) {
            navigate('/productos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const getProductosByCategory = async categoryId => {
        try {
            var lstObj = [];
            for (var i=0; i<productos.length; i++) {
                if (Number(productos[i].categoria) == categoryId) {
                    lstObj.push(productos[i])
                }
            }
            return lstObj
        } catch (error) {
            (error)
        }
    }

    const eliminarProducto = async id => {
        try {
            const productosActualizados = productos.filter(productoState => productoState._id !== id )
            setProductos(productosActualizados)

            setAlerta({
                msg: 'Se ha borrado el producto',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            (error)
        }
    }

    const modificarStock = async (articulo, operator) => {
        const producto = productos.filter(productoState => productoState._id == articulo._id )
        producto[0].stock = operator ? Number(producto[0].stock) - Number(articulo.cantidad) : Number(producto[0].stock) + 1
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(true)
        setTarea({})
    }

    const handleModalEditarTarea = tarea => {
        setModalFormularioTarea(true)
        setTarea(tarea)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }


    /*
    *   Categorias
    */
    const submitCategorias = async categoria => {
        if(categoria._id == null) {
            await nuevaCategoria(categoria)
        } else {
            await editarCategoria(categoria)
        }
    }

    const nuevaCategoria = async categoria => {
        try {
            const last = categorias[categorias.length - 1];
            const _id = last._id + 1;
            categoria._id = _id;
            setCategorias([...categorias, categoria])
            setAlerta({
                msg: 'Categoria Creada Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            (error)
        }
    }

    const editarCategoria = async categoria => {
        try {
            // Sincronizar el state
            var objEle;
            var categoriasArr = categorias;
            for (var i = 0 ; i < categoriasArr.length; i++) {
                if (categoriasArr[i]._id == categoria._id) {
                    categoriasArr[i] = categoria
                }
            }
            setCategorias(categoriasArr)
            setAlerta({
                msg: 'Categoría Actualizada Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            (error)
        }
    }

    const eliminarCategoria = async id => {
        try {
            const categoriaUpdate = categorias.filter(categoria => categoria._id !== id )
            setCategorias(categoriaUpdate)
            setAlerta({
                msg: 'Se ha borrado la categoria',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            (error)
        }
    }

    const buscarCategoriaById = async id => {
        try {
            const category = categorias.filter(categoria => categoria._id == id )
            return category
        } catch (error) {
            (error)
        }
    }

    const buscarCategorias = async () => {
        try {
            var myMap = new Map()
            for (let i = 0; i < categorias.length; i++) {
                myMap.set(categorias[i]._id, categorias[i])
            }
            return myMap
        } catch (error) {
            (error)
        }
    }

    const agregarProductoCesta = async articulo => {
        try {
            var exist = false;
            var cestaArr = cesta;
            var objNew;
            for (var i = 0 ; i < cestaArr.length; i++) {
                var sameTalla = cestaArr[i].talla == articulo.talla
                if (cestaArr[i]._id == articulo._id && !exist && sameTalla) {
                    cestaArr[i].cantidad = Number(cestaArr[i].cantidad) + Number(articulo.cantidad)
                    objNew = cestaArr[i]
                    cestaArr.splice(i, 1)
                    exist = true;
                }
            }
            modificarStock(articulo, true)
            agregarProductoSubtotal(articulo)
            if (exist == true) {
                setCesta([...cesta, objNew])
            } else {
                setCesta([...cesta, articulo])
            }
        } catch (error) {
            (error)
        }
    }

    const editarProductoCesta = async articulo => {
        try {
            // Sincronizar el state
            var objEle;
            var cestaArr = cesta;
            for (var i = 0 ; i < cestaArr.length; i++) {
                if (cestaArr[i]._id == articulo._id) {
                    cestaArr[i] = articulo
                }
            }
            modificarStock(articulo, false)
            setCesta(cestaArr)
            setAlerta({
                msg: 'Categoría Actualizada Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            (error)
        }
    }

    const borrarProductoCesta = async articulo => {
        try {
            const cestaAct = cesta.filter(productoState => productoState._id !== articulo._id )
            modificarStock(articulo, false)
            setCesta(cestaAct)
        } catch (error) {
            (error)
        }
    }

    const agregarProductoSubtotal = async articulo => {
        try {
            var totalRes = subtotal + (Number(articulo.precio) * Number(articulo.cantidad))
            setSubtotal(totalRes)
        } catch (error) {
            (error)
        }
    }

    const restarProductoSubtotal = async articulo => {
        try {
            var totalRes = subtotal - Number(articulo.precio)
            setSubtotal(totalRes)
        } catch (error) {
            (error)
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    // Socket io
    const submitTareasProducto = (tarea) => {
        const productoActualizado = {...producto}
        productoActualizado.tareas = [...productoActualizado.tareas, tarea]
        setProducto(productoActualizado)
    }
    const eliminarTareaProducto = tarea => {
        (tarea)
        const productoActualizado = {...producto}
        productoActualizado.tareas = productoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id )
        (productoActualizado)
        setProducto(productoActualizado)
    }

    const actualizarTareaProducto = tarea => {
        const productoActualizado = {...producto}
        productoActualizado.tareas = productoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState )
        setProducto(productoActualizado)
    }
    const cambiarEstadoTarea = tarea => {
        const productoActualizado = {...producto}
        productoActualizado.tareas = productoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProducto(productoActualizado)
    }

    const cerrarSesionProductos = () => {
        setProductos([])
        setProducto({})
        setAlerta({})

    }

    return (
        <ProductosContext.Provider
            value={{
                productos,
                mostrarAlerta,
                alerta,
                submitProducto,
                obtenerProducto,
                producto,
                cargando,
                eliminarProducto,
                modalFormularioTarea, 
                handleModalTarea,
                handleModalEditarTarea, 
                modalEliminarTarea,
                handleModalEliminarTarea,
                buscador, 
                handleBuscador,
                submitTareasProducto,
                eliminarTareaProducto,
                actualizarTareaProducto,
                setModalFormularioTarea,
                cambiarEstadoTarea,
                cerrarSesionProductos,
                cesta,
                setCesta,
                tallas,
                setTallas,
                categorias,
                setCategorias,
                submitCategorias,
                eliminarCategoria,
                buscarCategoriaById,
                buscarCategorias,
                agregarProductoCesta,
                editarProductoCesta,
                borrarProductoCesta,
                subtotal,
                setSubtotal,
                restarProductoSubtotal,
                getProductosByCategory
            }}
        >{children}
        </ProductosContext.Provider>
    )
}
export { 
    ProductosProvider
}

export default ProductosContext