import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { CircleAlert, Eye, EyeOff, IdCard, LoaderCircle, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginSchema } from '../auth.schemas'
import type { LoginData } from '../auth.types'

interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>
}

type FieldErrors = Partial<Record<keyof LoginData, string>>

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = loginSchema.safeParse({ employeeNumber, password })

    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors
      setFieldErrors({
        employeeNumber: errors.employeeNumber?.[0],
        password: errors.password?.[0],
      })
      return
    }

    setFieldErrors({})
    setError(null)
    setLoading(true)
    try {
      await onSubmit(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa con tu número de empleado y contraseña.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {error && (
          <Alert variant="destructive">
            <CircleAlert />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Número de empleado */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="employeeNumber">Número de empleado</Label>
          <div className="relative">
            <IdCard className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="employeeNumber"
              inputMode="numeric"
              placeholder="User123"
              className="h-10 pl-9"
              value={employeeNumber}
              onChange={(e) => {
                setEmployeeNumber(e.target.value)
                setFieldErrors((prev) => ({ ...prev, employeeNumber: undefined }))
              }}
              aria-invalid={!!fieldErrors.employeeNumber}
              autoComplete="username"
              autoFocus
              disabled={loading}
            />
          </div>
          {fieldErrors.employeeNumber && (
            <p className="text-sm text-destructive">{fieldErrors.employeeNumber}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="h-10 pl-9 pr-10"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setFieldErrors((prev) => ({ ...prev, password: undefined }))
              }}
              aria-invalid={!!fieldErrors.password}
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((show) => !show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          )}
        </div>

        <Button type="submit" className="mt-2 h-10 w-full" disabled={loading}>
          {loading && <LoaderCircle className="animate-spin" />}
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </Button>
      </form>
    </div>
  )
}