import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket;

const ProductosContext = createContext();

const ProductosProvider = ({children}) => {
    
    const [productos, setProductos] = useState([
        { _id:1, nombre: "Superman", categoria: "2", descripcion: "El paquete de 6 camisetas básicas te permite expresar completamente tu vibrante personalidad con tres opciones de escala de grises.",
            precio: 50, imagen: '/images/1.jpg', stock: 10},
        { _id:2, nombre: "Power Rangers", categoria: "1", descripcion: "jose", precio: 15, imagen: '/images/2.jpg', stock: 10},
        { _id:3, nombre: "Superman", categoria: "2", descripcion: "jose", precio: 15, imagen: '/images/3.jpg', stock: 20},
        { _id:4, nombre: "Batman", categoria: "2", descripcion: "jose", precio: 20, imagen: '/images/4.jpg', stock: 25},
        { _id:5, nombre: "Power Rangers", categoria: "1", descripcion: "jose", precio: 20, imagen: '/images/5.jpg', stock: 13},
        { _id:6, nombre: "Pokemon", categoria: "1", descripcion: "jose", precio: 10, imagen: '/images/1.jpg', stock: 5}
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
    const [ modalFormularioTarea, setModalAgregarProducto  ] = useState(false)
    const [ tarea, setTarea ] = useState({})
    const [ modalEliminarTarea, setModalEliminarTarea  ] = useState(false)
    const [ buscador, setBuscador ] = useState(false)

    // Cesta de la compra
    const [ cesta, setCesta ] = useState([
        { _id:1, productId: 1, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:2, productId: 2, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:3, productId: 2, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:4, productId: 2, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'},
        { _id:5, productId: 3, nombre: "Superman", precio: "50", unidades: 3, imagen: '/images/4.jpg'}
    ]);

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

    const handleModalTarea = () => {
        setModalAgregarProducto(!modalFormularioTarea)
        setTarea({})
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalAgregarProducto(true)
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
                cambiarEstadoTarea,
                cerrarSesionProductos,
                cesta,
                setCesta,
                tallas,
                setTallas,
                categorias,
                setCategorias,
                submitCategorias,
                eliminarCategoria
            }}
        >{children}
        </ProductosContext.Provider>
    )
}
export { 
    ProductosProvider
}

export default ProductosContext