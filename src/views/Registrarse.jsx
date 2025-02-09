import { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'

const Registrarse = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();
        if([nombre, email, password, repetirPassword].includes('')) {
           setAlerta({
               msg: 'Todos los campos son obligatorios',
               error: true
           })
           return
        }
        if(password.length < 6 ) {
            setAlerta({
                msg: 'El Password es muy corto, agrega minimo 6 caracteres',
                error: true
            })
            return
        }
        if(password !== repetirPassword ) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            })
            return
        }
        setAlerta({})

        try {
            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: 'Error no reconocido',
                error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <Fragment>
        <div className='bg-neutral-200 p-12 rounded-xl'>
        <h1 className="text-orange-700 font-black text-4xl capitalize">Crea tu cuenta para comprar</h1>
        { msg && <Alerta alerta={alerta} /> }
    
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit} >
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="nombre"
                    >Nombre</label>
                    <input
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="nombre"
                        type="text"
                        placeholder="Introduce tu nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="email"
                        type="email"
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                    <input
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir Password</label>
                    
                    <input id="password2"
                        type="password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repetirPassword}
                        placeholder="Repetir tu Password"
                        onChange={e => setRepetirPassword(e.target.value)} />
                </div>

                <input className="bg-orange-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-800 transition-colors"
                    type="submit"
                    value="Crear Cuenta" />
                
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/login">Iniciar Sesión</Link>
                <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/login/resetpass">Recordar Password</Link>
            </nav>
        </div>
    </Fragment>
  )
}

export default Registrarse