import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ROLES } from '@/types/roles'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/no-autorizado"
          element={<p className="p-8">No tienes permiso para ver esta página.</p>}
        />

        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERVISOR]} />}>
          <Route path="/admin" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}