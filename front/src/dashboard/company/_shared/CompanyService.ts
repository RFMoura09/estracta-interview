import { AddCompanyModel, CompanyModel, CompanyUtils, DeleteCompanyModel, EditCompanyModel, GetCompaniesParams } from "./CompaniesModels";
import { api, apiConfig } from '../../../_shared/http/Api';

class CompanyService {
  async getCompanies(params: Partial<GetCompaniesParams>): Promise<CompanyModel[]> {
    return api.get<CompanyModel[]>('/company/', {
      ...apiConfig,
      params,
    })
    .then(res  => res.data.map(CompanyUtils.fromJSON))
  }

  async getTotalPages(): Promise<number> {
    return api.get<number>('/company/pages', {
      ...apiConfig
    }).then((res) => res.data)
  }

  async addCompany(company: AddCompanyModel): Promise<void> {
    return api.post('/company/', company)
  }

  async editCompany(model: EditCompanyModel): Promise<void> {
    const { cnae, name_fantasy } = model
    return api.put(`/company/${model.cnpj}`, { cnae, name_fantasy })
  }

  async deleteCompany(model: DeleteCompanyModel): Promise<void> {
    return api.delete(`/company/${model.cnpj}`)
  }
}

export const _companyService = new CompanyService();