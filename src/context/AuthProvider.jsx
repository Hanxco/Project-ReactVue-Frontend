import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(null)
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()
    
    const [users, setUsers] = useState([
        { _id:0, email: "admin@gmail.com", password: "1234", token: "sdao2si1iosl", profile: "admin" },
        { _id:1, email: "carlos@gmail.com", password: "0000", token: "38sdakm2sda", profile: "user" }
    ])

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (token != null) {
                var userObj;
                for (var i = 0; i < users.length; i++) {
                    if (token == users[i].token) {
                        userObj = users[i];
                    }
                }
                setAuth(userObj);
                navigate('/')
                setTimeout(() => {
                    setCargando(false)
                }, 1000);
                return
            } else {
                navigate('/')
            }
        }
        autenticarUsuario()
    }, [auth])

    const cerrarSesionAuth = () => {
        setAuth(null)
        localStorage.setItem('token', null)
    }

    const resetPassword = email => {
        for (var i = 0; i<users.length; i++) {
            if (users[i].email == email) {
                users[i].password = '1234'
            }
        }
    }

    const isLogged = async () => {
        var logged = false
        const token = localStorage.getItem('token')
        if (token != null && auth != null) {
            logged = true
        }
        return logged
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                users,
                setUsers,
                cerrarSesionAuth,
                resetPassword,
                isLogged
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;