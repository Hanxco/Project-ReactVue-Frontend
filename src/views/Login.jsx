import { Fragment, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth, users } = useAuth();
    const { msg } = alerta

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();
        
        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }
        try {
            setAlerta({})
            // AUTH PROVIDER
            var userObj;
            for (var i = 0; i <= users.length-1; i++) {
                if (email == users[i].email && password == users[i].password) {
                    userObj = users[i]
                }
            }
        
        if (userObj == null) {
            setAlerta({
                msg: 'Usuario o contraseña incorrecta',
                error: true
            })
            navigate('/login')
        } else {
            localStorage.setItem('token', userObj.token)
            setAuth(userObj)
            navigate('/')
        }
        } catch (error) {
            setAlerta({
                msg: 'Usuario o contraseña incorrecta',
                error: true
            })
        }

    }

  return (
    <Fragment>
        <div className='bg-neutral-200 p-12 rounded-xl'>
            <h1 className="text-orange-600 hover:text-slate-500 font-black text-5xl">Inicio de sesión</h1>
            {msg && <Alerta alerta={alerta } />}
            <form  className="rounded-lg p-10 my-10 bg-white shadow" onSubmit={handleSubmit} >
                <div className="my-5">
                    <label 
                        className="block text-xl font-bold uppercase text-gray-600"
                        htmlFor="email"
                    >Email</label>
                    <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="email"
                        type="email"
                        value={email}
                        placeholder="Introduce el email"
                        onChange={ e => setEmail(e.target.value)} />
                </div>
                <div className="my-5">
                    <label className="block text-xl font-bold uppercase text-gray-600" htmlFor="password" >Contraseña</label>
                    <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Introduce la contraseña"
                        onChange={ e => setPassword(e.target.value)} />
                </div>
                <input 
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-orange-700 hover:cursor-pointer hover:bg-orange-800 transition-colors mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer"/>
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/login/registrarse" >Registro de una nueva cuenta</Link>
                <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/login/resetpass">Recordar contraseña</Link>
            </nav>
        </div>
    </Fragment>
  )
}

export default Login