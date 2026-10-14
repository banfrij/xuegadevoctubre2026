import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="p-8 text-center text-slate-600">Cargando sesión...</p>
  }

  return user ? <Outlet /> : <Navigate to="/" replace />
}
