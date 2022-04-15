import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'

import Login from './views/Login'
import NuevoPassword from './views/NuevoPassword'
import Registrarse from './views/Registrarse'
import ConfirmarCuenta from './views/ConfirmarCuenta'
import RecordarPassword from './views/RecordarPassword'
import Productos from './views/Productos'
import Producto from './views/Producto'
import NuevoProducto from './views/NuevoProducto'
import NuevaCategoria from './views/NuevaCategoria'
import Buscador from './views/Buscador'

import { AuthProvider } from './context/AuthProvider'
import { ShopProvider } from './context/ShopProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <Routes>
              <Route path="/" element={<AppLayout />}>
                  <Route index element={<Productos />} />
                  <Route path=":id" element={<Producto />} />
              </Route>

              <Route path="/categoria" element={<AppLayout />}>
                  <Route path=":id" element={<Buscador />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                  <Route path="crear-producto" element={<NuevoProducto />} />
                  <Route path="crear-categoria" element={<NuevaCategoria />} />
              </Route>

              <Route path="/login" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path="registrarse" element={<Registrarse />} />
                  <Route path="resetpass/:token" element={<NuevoPassword />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                  <Route path="resetpass" element={ <RecordarPassword/> } />
              </Route>
          </Routes>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
