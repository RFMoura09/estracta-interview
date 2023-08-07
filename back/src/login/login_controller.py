from flask import request

from flask_restx import Namespace, Resource

from .login_service import loginService

from .login_models import LoginSchema

api = Namespace('Login')

@api.route('/')
class LoginController(Resource):

    @api.expect(api.model('Login', LoginSchema.swagger_model()))
    def post(self):
      try:
         body = request.json
         token = loginService.login(body)

         return { 'token': token }, 200
      except Exception as e:
         return { 'error': str(e) }, 400