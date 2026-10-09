import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { authService } from '../auth.service'
import type { AuthSession, LoginData } from '../auth.types'
import { setAccessToken } from '@/lib/api'

const STORAGE_KEY = 'lissystem.session'

function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthSession) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // 1. Al arrancar: carga la sesión y le pasa el token al cliente HTTP
  const [session, setSession] = useState<AuthSession | null>(() => {
    const saved = loadSession()
    setAccessToken(saved?.accessToken ?? null)
    return saved
  })

  const login = async (data: LoginData) => {
    const result = await authService.login(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    setAccessToken(result.accessToken) // 2. Al entrar
    setSession(result)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setAccessToken(null) // 3. Al salir
    setSession(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        token: session?.accessToken ?? null,
        isAuthenticated: session !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}