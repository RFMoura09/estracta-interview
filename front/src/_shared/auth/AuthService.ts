import { api } from "../http/Api"
import { LoginData } from "./AuthModels"
import { _tokenService } from "./TokenService"

class AuthService {
  isLogged(): boolean {
    return !!_tokenService.getToken()
  }

  async login(data: LoginData) {
    const token = await api.post('/login/', data).then(res => res.data.token)
    _tokenService.saveToken(token)
  }

  logout() {
    _tokenService.clearToken()
  }
}

export const _authService = new AuthService() 