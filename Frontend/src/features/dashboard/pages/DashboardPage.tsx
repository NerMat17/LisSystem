import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/context/useAuth'

export function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user?.name} ({user?.role})
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </main>
  )
}