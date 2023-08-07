from functools import wraps
from flask import Response, request
from flask_restx import Namespace

from .token_service import tokenService

def __authorize(f):
    @wraps(f)
    def _authorize(*args, **kwargs):
        try: 
            auth_header = 'authorization'

            if not auth_header in request.headers:
                return Response(status=401)

            auth = request.headers[auth_header].split(' ')

            if auth[0].lower() != 'bearer':
                return Response(status=401)

            if not tokenService.validate_token(auth[1]):
                return Response(status=401)

            return f(*args, **kwargs)
        except:
            return Response(status=401)
    return _authorize

def authorize(namespace: Namespace):
    def inner(func):
        return namespace.doc(security='bearer')(__authorize(func))
    return inner
