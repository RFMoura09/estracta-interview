from flask import Response, request

from flask_restx import Namespace, Resource

from _shared.auth.meta import authorize

from .company_service import companyService

from .company_models import CompanyPostSchema, CompanyPutSchema, GetCompaniesSchema, GetPageCountSchema

api = Namespace('Company')

@api.route('/pages')
class GetPageCountController(Resource):
    @authorize(api)
    @api.doc(params=GetPageCountSchema.swagger_model())
    def get(self):
        try:
            args = request.args
            return companyService.get_companies_pages(args.get('entries') or 25), 200
        except Exception as e:
            return { 'error': str(e) }, 400

@api.route('/<string:cnpj>')
class SingleCompanyController(Resource):
    @authorize(api)
    @api.expect(api.model('CompanyUpdateDTO', CompanyPutSchema.swagger_model()), validate=False)
    def put(self, cnpj):
        try:
            body = request.json
            return companyService.update_company(
                cnpj=cnpj,
                cnae=body.get('cnae'),
                name_fantasy=body.get('name_fantasy')
            ), 200
        except Exception as e:
            return { 'error': str(e) }, 400

    @authorize(api)
    def delete(self, cnpj):
        try:
            return companyService.delete_company(
                cnpj=cnpj
            ), 200
        except Exception as e:
            return { 'error': str(e) }, 400


@api.route('/')
class CompanyController(Resource):

    @authorize(api)
    @api.doc(params=GetCompaniesSchema.swagger_model())
    def get(self):
        try:
            args = request.args
            return companyService.get_companies(
                entries=args.get('companies') or 25,
                page=args.get('page') or 0,
                name=args.get('name'),
                order_cnae=args.get('order_cnae') or False,
                order_cnpj=args.get('order_cnpj') or False,
                order_fantasy_name=args.get('order_fantasy_name') or False,
                order_name=args.get('order_name') or False,
            ), 200
        except Exception as e:
            return { 'error': str(e) }, 400

    @authorize(api)
    @api.expect(api.model('CompanyPostDTO', CompanyPostSchema.swagger_model()))
    def post(self):
        try:
            body = request.json
            companyService.add_company(body)

            return Response(status=201)
        except Exception as e:
            return { 'error': str(e) }, 400
      