from _shared.db.connect import DbService
from _shared.utils.db_tolist import db_tolist
from .company_models import CompanyModel, CompanyPostSchema, CompanyPutSchema, CompanySchema

companies = []

class CompanyService():
    def get_companies(self, 
                      page: int, 
                      entries: int, 
                      name: str, 
                      order_cnpj: bool, 
                      order_name: bool, 
                      order_fantasy_name: bool, 
                      order_cnae: bool):
      conn = DbService.connect()
      cursor = conn.cursor()
      cursor.execute("""
        select get_companies(
          _entries => %s,
          _page => %s,
          _name => %s,
          _order_cnpj => %s,
          _order_name => %s,
          _order_fantasy_name => %s,
          _order_cnae =>  %s
        )
      """, (entries, page, name, order_cnpj, order_name, order_fantasy_name, order_cnae))
      companies = cursor.fetchall()
      cursor.close()
      conn.close()

      companies = db_tolist(companies)
      companies = [CompanyModel.from_db(company) for company in companies]

      return companies
    
    def get_companies_pages(self, entries: int):
      conn = DbService.connect()
      cursor = conn.cursor()
      cursor.execute("""
        select get_companies_page_count(
          _entries => %s
        )
      """, [entries])
      pages = int(cursor.fetchone()[0])
      cursor.close()
      conn.close()

      return pages

    def add_company(self, company: dict) -> None:
      errors = CompanySchema().validate(company)

      if errors:
        raise Exception(errors)
      
      conn = DbService.connect()
      cursor = conn.cursor()
      cursor.execute("""
        select add_company(
          _cnpj => %s,
          _name => %s,
          _fantasy_name => %s,
          _cnae => %s
        )
      """, (company['cnpj'], company['name'], company['name_fantasy'], company['cnae']))
      conn.commit()
      cursor.close()
      conn.close()
    
    def update_company(self, cnpj: str, name_fantasy = None, cnae = None):

      if name_fantasy is None and cnae is None:
        raise Exception('name_fantasy or cnae is required')

      errors = CompanyPutSchema().validate({
        'cnpj': cnpj,
        'name_fantasy': name_fantasy,
        'cnae': cnae
      }, partial=True)

      if errors:
        raise Exception(errors)
      
      conn = DbService.connect()
      cursor = conn.cursor()
      cursor.execute("""
        select edit_company(
          _cnpj => %s,
          _fantasy_name => %s,
          _cnae => %s
        )
      """, (cnpj, name_fantasy, cnae))
      conn.commit()
      cursor.close()
      conn.close()

    def delete_company(self, cnpj):

      errors = CompanySchema().validate({
        'cnpj': cnpj
      }, partial=True)

      if errors:
        raise Exception(errors)
      
      conn = DbService.connect()
      cursor = conn.cursor()
      cursor.execute("select delete_company('"+str(cnpj)+"')")
      conn.commit()
      cursor.close()
      conn.close()


companyService = CompanyService()