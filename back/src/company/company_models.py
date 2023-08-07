from attr import dataclass
from flask_restx import fields as swagger_field

from marshmallow import Schema, fields, validate

@dataclass
class CompanyModel:
  cnpj: str
  name: str
  name_fantasy: str
  cnae: str

  @staticmethod
  def from_db(model) -> dict:
    return {
      'cnpj': model[0],
      'name': model[1],
      'name_fantasy': model[2],
      'cnae': model[3]
    }
  
class CompanySchema(Schema):
  cnpj = fields.String(validate=validate.Regexp("\d{14}", error='cnpj is invalid'))
  name = fields.String(validate=validate.Length(min=1, error='name cannot be empty')) 
  name_fantasy = fields.String(validate=validate.Length(min=1, error='fantasy name cannot be empty'))
  cnae = fields.String(validate=[validate.Regexp("\d{7}", error='cnae is invalid')])
  
class CompanyPostSchema():
  @staticmethod
  def swagger_model():
    return {
      'cnpj': swagger_field.String,
      'name': swagger_field.String,
      'name_fantasy': swagger_field.String,
      'cnae': swagger_field.String
    }

class GetCompaniesSchema():
  @staticmethod
  def swagger_model():
    return {
      'entries': {'in': 'query', 'type': 'int'},
      'page': {'in': 'query', 'type': 'int'},
      'name': {'in': 'query', 'type': 'string'},
      'order_cnpj': {'in': 'query', 'type': 'boolean'},
      'order_name': {'in': 'query', 'type': 'boolean'},
      'order_fantasy_name': {'in': 'query', 'type': 'boolean'},
      'order_cnae': {'in': 'query', 'type': 'boolean'},
    }
  
class GetPageCountSchema():
  @staticmethod
  def swagger_model():
    return {
      'entries': {'in': 'query', 'type': 'int'},
      'name': {'in': 'query', 'type': 'string'},
    }

class CompanyPutSchema(CompanySchema):
  name_fantasy = fields.String(required=False, allow_none=True, validate=validate.Length(min=1, error='fantasy name cannot be empty'))
  cnae = fields.String(required=False, allow_none=True, validate=[validate.Regexp("\d{7}", error='cnae is invalid')])

  @staticmethod
  def swagger_model():
    return {
      'name_fantasy': swagger_field.String(required=False),
      'cnae': swagger_field.String(required=False)
    }
  