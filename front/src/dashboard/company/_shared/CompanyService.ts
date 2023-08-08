import { AddCompanyModel, CompanyModel, CompanyUtils, DeleteCompanyModel, EditCompanyModel, GetCompaniesParams } from "./CompaniesModels";
import { api, apiConfig } from '../../../_shared/http/Api';

class CompanyService {
  async getCompanies(params: Partial<GetCompaniesParams>, config?: any): Promise<CompanyModel[]> {
    return api.get<CompanyModel[]>('/company/', {
      ...config,
      params,
    })
    .then(res  => res.data.map(CompanyUtils.fromJSON))
  }

  async getTotalPages(name?: string, config?: any): Promise<number> {
    return api.get<number>('/company/pages', {
      ...config,
      params: { 
        ...(name ? { name } : {}),
      }
    }).then((res) => res.data)
  }

  async addCompany(company: AddCompanyModel, config?: any): Promise<void> {
    return api.post('/company/', company, {
      ...config,
    })
  }

  async editCompany(model: EditCompanyModel, config?: any): Promise<void> {
    const { cnae, name_fantasy } = model
    return api.put(`/company/${model.cnpj}`, { cnae, name_fantasy }, {
      ...config,
    })
  }

  async deleteCompany(model: DeleteCompanyModel, config?: any): Promise<void> {
    return api.delete(`/company/${model.cnpj}`, {
      ...config,
    })
  }
}

export const _companyService = new CompanyService();