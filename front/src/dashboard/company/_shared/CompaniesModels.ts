import { cnaeFormatter, cnpjFormatter, removeSymbols } from "../../../_shared/utils/Formatters";

export interface CompanyModel {
  cnpj: string;
  name: string;
  name_fantasy: string;
  cnae: string;
}

export class CompanyUtils {
  static cnpjMask = '99.999.999/9999-99'
  static cnpjRegex = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/
  static cnaeMask = '9999-9/99'
  static cnaeRegex = /\d{4}-\d{1}\/\d{2}/

  static fromJSON(model: CompanyModel): CompanyModel {
    return {
      ...model,
      cnpj: cnpjFormatter(model.cnpj),
      cnae: cnaeFormatter(model.cnae),
    }
  }
  static toModel(model: CompanyModel): CompanyModel {
    return {
      ...model,
      cnpj: removeSymbols(model.cnpj),
      cnae: removeSymbols(model.cnae),
    }
  }
}

export interface GetCompaniesParams {
  entries: string;
  page: string;
  name: string;
  order_cnpj: string;
  order_name: string;
  order_fantasy_name: string;
  order_cnae: string;
}

export type AddCompanyModel = CompanyModel
export interface DeleteCompanyModel {
  cnpj: string;
}
export class DeleteCompanyUtils {
  static toModel(model: DeleteCompanyModel): DeleteCompanyModel {
    return {
      cnpj: removeSymbols(model.cnpj)
    };
  }
}
export interface EditCompanyModel {
  cnpj: string;
  name_fantasy?: string;
  cnae?: string;
}
export class EditCompanyUtils {
  static toModel(model: EditCompanyModel): EditCompanyModel {
    if(model.cnae) {
      model.cnae = removeSymbols(model.cnae)
    } else {
      delete model.cnae
    }

    if(!model.name_fantasy) delete model.name_fantasy
    return {
      ...model,
      cnpj: removeSymbols(model.cnpj),
    };
  }
}

