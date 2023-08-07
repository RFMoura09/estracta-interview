import { redirect } from "react-router-dom";
import { _authService } from "../_shared/auth/AuthService";

export function indexLoader() {
  if(_authService.isLogged()) {
    return redirect('/dashboard')
  }

  return redirect('/login')
}

export function loginLoader() {
  if(_authService.isLogged()) {
    return redirect('/dashboard/company/list')
  }

  return {};
}

export function dashboardLoader() {
  if(!_authService.isLogged()) {
    return redirect('/login')
  }

  return {};
}