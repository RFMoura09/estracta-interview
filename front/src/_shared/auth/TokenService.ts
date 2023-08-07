class TokenService {
  getToken(): string {
    return localStorage.getItem('token') ?? ''
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  clearToken() {
    localStorage.removeItem('token')
  }
}

export const _tokenService = new TokenService()