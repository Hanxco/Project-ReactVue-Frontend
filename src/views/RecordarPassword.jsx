import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const RecordarPassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const { resetPassword } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '' || email.length < 6) {
            setAlerta({
                msg: 'El Email es obligatorio',
                error: true
            });
            return
        }

        try {
            resetPassword(email)
            setAlerta({
                msg: 'Se ha reseteado el usuario',
                error: false
            })
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
                <h1 className="text-orange-600 font-black text-5xl capitalize">Restablecer password</h1>
                { msg && <Alerta alerta={alerta} />}

                <form  className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit} >
                    <div className="my-5">
                        <label  className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                        <input className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            id="email"
                            type="email"
                            value={email}
                            placeholder="Introducir email"
                            onChange={ e => setEmail(e.target.value)} />
                    </div>
                    <input 
                        className="bg-orange-700 hover:cursor-pointer hover:bg-orange-800 transition-colors mb-5 w-full py-3 text-white uppercase font-bold rounded"
                        type="submit"
                        value="Enviar" />
                </form>

                <nav className="lg:flex lg:justify-between">
                    <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/login">Iniciar Sesión</Link>
                    <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/login/registrarse">Regístrarse</Link>
                </nav>
            </div>
        </Fragment>
    )
}

export default RecordarPassword