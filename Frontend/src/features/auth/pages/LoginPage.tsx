import { Navigate, useLocation, useNavigate } from 'react-router'
import { Factory } from 'lucide-react'
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
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Panel izquierdo: solo en pantallas grandes */}
      <aside className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary-foreground/10">
            <Factory className="size-5" />
          </div>
          LisSystem
        </div>

        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-semibold leading-tight">
            Cada paro cuenta. Cada minuto se mide.
          </h2>
          <p className="text-primary-foreground/70">
            Monitoreo de líneas de producción y Andon digital en tiempo real.
          </p>
        </div>

        <p className="text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} LisSystem
        </p>
      </aside>

      {/* Panel derecho: el formulario */}
      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo solo en móvil, porque ahí no se ve el panel izquierdo */}
          <div className="mb-10 flex items-center gap-3 text-lg font-semibold lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Factory className="size-5" />
            </div>
            LisSystem
          </div>

          <LoginForm onSubmit={handleLogin} />
        </div>
      </main>
    </div>
  )
}