import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductsList from './pages/Products/List'
import ProductCreate from './pages/Products/Create'
import ProductEdit from './pages/Products/Edit'
import Profile from './pages/Profile'
import useAuthStore  from './store/authStore'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="products"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="products/create"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <ProductCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="products/edit/:id"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <ProductEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App