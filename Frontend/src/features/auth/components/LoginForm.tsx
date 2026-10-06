import { useState, type FormEvent } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { loginSchema } from '../auth.schemas'
import type { LoginData } from '../auth.types'

interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>
}

// Un mensaje de error opcional por cada campo del formulario
type FieldErrors = Partial<Record<keyof LoginData, string>>

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 1. Validación del frontend
    const result = loginSchema.safeParse({ employeeNumber, password })

    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors
      setFieldErrors({
        employeeNumber: errors.employeeNumber?.[0],
        password: errors.password?.[0],
      })
      return // no se envía nada al servidor
    }

    // 2. Datos válidos: se envían (y el backend vuelve a validar)
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">LisSystem</CardTitle>
        <CardDescription>Ingresa al sistema administrativo</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="employeeNumber">Número de empleado</Label>
            <Input
              id="employeeNumber"
              inputMode="numeric"
              value={employeeNumber}
              onChange={(e) => {
                setEmployeeNumber(e.target.value)
                setFieldErrors((prev) => ({ ...prev, employeeNumber: undefined }))
              }}
              aria-invalid={!!fieldErrors.employeeNumber}
              autoComplete="username"
              autoFocus
            />
            {fieldErrors.employeeNumber && (
              <p className="text-sm text-destructive">{fieldErrors.employeeNumber}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setFieldErrors((prev) => ({ ...prev, password: undefined }))
              }}
              aria-invalid={!!fieldErrors.password}
              autoComplete="current-password"
            />
            {fieldErrors.password && (
              <p className="text-sm text-destructive">{fieldErrors.password}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-6">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar sesión'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}