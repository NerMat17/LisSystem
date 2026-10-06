import { Navigate, useLocation, useNavigate } from 'react-router'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../context/useAuth'
import type { LoginData } from '../auth.types'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleLogin = async (data: LoginData) => {
    await login(data)
    navigate(from, { replace: true })
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-4">
      <LoginForm onSubmit={handleLogin} />
    </main>
  )
}