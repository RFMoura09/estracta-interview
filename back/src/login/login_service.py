from _shared.auth.token_service import tokenService
from .login_models import LoginSchema


class LoginService:
    def login(self, body: dict) -> str:
        errors = LoginSchema().validate(body)

        if errors:
            raise Exception(errors)

        return tokenService.generate_token()

loginService = LoginService()