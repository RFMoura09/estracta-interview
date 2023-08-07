from flask_restx import fields as swagger_field
from marshmallow import Schema, fields, validate

class LoginSchema(Schema):
  username = fields.String(required=True, validate=validate.Length(min=5))
  password = fields.String(required=True, validate=validate.Length(min=10)) 
  
  @staticmethod
  def swagger_model():
    return {
      'username': swagger_field.String,
      'password': swagger_field.String,
    }