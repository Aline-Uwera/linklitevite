import { toast } from 'sonner'

export interface AuthResponse {
  access_token: string
  user: User
}

export interface User {
  id: string
  username: string
  email: string
  created_at: string
}

export interface UrlData {
  id: string
  short_code: string
  long_url: string
  created_at: string
  clicks: number
}

export interface UrlAnalytics {
  short_code: string
  long_url: string
  clicks: number
  created_at: string
}

const getToken = () => localStorage.getItem('token')

const createHeaders = (includeAuth = true) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (includeAuth) {
    const token = getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

export const api = {
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: createHeaders(false),
          body: JSON.stringify({ username, email, password }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      return await response.json()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Registration failed'
      )
      throw error
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: createHeaders(false),
          body: JSON.stringify({ email, password }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      return await response.json()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
      throw error
    }
  },

  async shortenUrl(longUrl: string): Promise<UrlData> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/urls/shorten`,
        {
          method: 'POST',
          headers: createHeaders(),
          body: JSON.stringify({ long_url: longUrl }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to shorten URL')
      }

      return await response.json()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to shorten URL'
      )
      throw error
    }
  },

  async getUrls(): Promise<UrlData[]> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/urls`,
        {
          headers: createHeaders(),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fetch URLs')
      }

      return await response.json()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch URLs'
      )
      throw error
    }
  },

  async getUrlAnalytics(shortCode: string): Promise<UrlAnalytics> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/urls/analytics/${shortCode}`,
        {
          headers: createHeaders(),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fetch URL analytics')
      }

      return await response.json()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch URL analytics'
      )
      throw error
    }
  },
  async redirectToLongUrl(shortUrl: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/urls/${shortUrl}`,
        {
          headers: createHeaders(),
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to redirect short URL')
      }
      const data = await response.json()
      window.location.href = data.longUrl

    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to redirect short URL'
      )
      throw error
    }
  },
  getFullShortUrl(shortCode: string): string {
    return `${import.meta.env.VITE_API_BASE_URL}/urls/${shortCode}`
  },
}
