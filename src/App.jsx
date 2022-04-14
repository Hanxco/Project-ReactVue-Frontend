import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout'

import Login from './views/Login'
import Registrarse from './views/Registrarse'
import RecordarPassword from './views/RecordarPassword'
import NuevoPassword from './views/NuevoPassword'
import ConfirmarCuenta from './views/ConfirmarCuenta'
import Productos from './views/Productos'
import NuevoProducto from './views/NuevoProducto'
import NuevaCategoria from './views/NuevaCategoria'
import Producto from './views/Producto'
import Buscador from './views/Buscador'

import { AuthProvider } from './context/AuthProvider'
import { ProductosProvider } from './context/ProductosProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
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
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
