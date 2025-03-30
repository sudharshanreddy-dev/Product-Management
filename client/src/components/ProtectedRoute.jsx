import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ isAllowed, children, redirectPath = '/login' }) => {
  const location = useLocation()

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute