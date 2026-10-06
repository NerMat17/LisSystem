import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { authService } from '../auth.service'
import type { AuthSession, LoginData } from '../auth.types'

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
  const [session, setSession] = useState<AuthSession | null>(loadSession)

  const login = async (data: LoginData) => {
    const result = await authService.login(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    setSession(result)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
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