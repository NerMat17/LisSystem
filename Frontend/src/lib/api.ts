const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { ...headers, ...(options.headers as Record<string, string> | undefined) },
    })
  } catch {
    // No hubo respuesta: servidor apagado, sin red o URL incorrecta
    throw new ApiError(0, 'No se pudo conectar con el servidor. Intenta de nuevo.')
  }

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(response.status, body?.message ?? 'Error de comunicación con el servidor')
  }

  return body as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
}