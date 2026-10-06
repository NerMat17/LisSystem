import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/features/auth/context/useAuth'
import type { Role } from '@/types/roles'

interface ProtectedRouteProps {
  allowedRoles?: Role[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/no-autorizado" replace />
  }

  return <Outlet />
}