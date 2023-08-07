import PageTitle from '../../_shared/page-title/PageTitle'
import InputMask from 'react-input-mask';
import { CompanyUtils, DeleteCompanyModel, DeleteCompanyUtils } from '../_shared/CompaniesModels';
import { useLoader } from '../../../_shared/ui/loader/LoaderContext';
import { useToast } from '../../../_shared/ui/toast/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { _companyService } from '../_shared/CompanyService';

export default function DeleteCompanyPage() {
  const { emitToast } = useToast();

  const { emitLoader } = useLoader();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<DeleteCompanyModel>()

  const deleteCompany = (data: DeleteCompanyModel) => {
    emitLoader(true)
    _companyService.deleteCompany(DeleteCompanyUtils.toModel(data))
    .then(() => {
      emitToast('Empresa Deletada Com Sucesso!')
      navigate('/dashboard/company/list')
    })
    .catch((e) => {
      emitToast(JSON.stringify(e.response.data))
    })
    .finally(() => {
      emitLoader(false)
    })
  }
  
  return (
    <form onSubmit={handleSubmit(deleteCompany)}>
      <PageTitle title='Deletar Empresa' />

      <label>
        <span>Empresa (CNPJ)</span>
        <InputMask 
          className='input' 
          mask={CompanyUtils.cnpjMask} 
          maskChar={null}
          {...register('cnpj', { required: true, pattern: CompanyUtils.cnpjRegex })} 
        />
        {errors?.cnpj && <p className='error'>CNPJ inválido</p>}
      </label>

      <div className="flex justify-between lg:w-2/12">
        <input type="submit" value="Deletar" />
      </div>
    </form>
  )
}
