import PageTitle from '../../_shared/page-title/PageTitle'
import InputMask from 'react-input-mask';
import { CompanyUtils, EditCompanyModel, EditCompanyUtils } from '../_shared/CompaniesModels';
import { useLoader } from '../../../_shared/ui/loader/LoaderContext';
import { useToast } from '../../../_shared/ui/toast/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { _companyService } from '../_shared/CompanyService';
import { _tokenService } from '../../../_shared/auth/TokenService';

export default function EditCompanyPage() {

  const { emitLoader } = useLoader();
  const { emitToast } = useToast();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<EditCompanyModel>()

  const editCompany = (data: EditCompanyModel) => {
    emitLoader(true)
    _companyService.editCompany(EditCompanyUtils.toModel(data), {
      headers: {'authorization': 'bearer ' + _tokenService.getToken()}
    })
    .then(() => {
      emitToast('Empresa Editada Com Sucesso!')
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
    <form onSubmit={handleSubmit(editCompany)}>
      <PageTitle title='Editar Empresa' />
      
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

      <p className='text-lg font-medium text-blue-600 mt-5'>Novos Dados</p>
      <hr className='mb-5' />
      <label>
        <span>Nome Fantasia</span>
        <input type="text" {...register('name_fantasy', { minLength:1 })} />
        {errors?.name_fantasy && <p className='error'>Nome Fantasia inválido</p>}
      </label>
      <label>
        <span>CNAE</span>
        <InputMask 
          className='input' 
          mask={CompanyUtils.cnaeMask} 
          maskChar={null}
          {...register('cnae', { pattern: CompanyUtils.cnaeRegex })} 
        />
        {errors?.cnae && <p className='error'>CNAE inválido</p>}
      </label>

      <div className="flex justify-between lg:w-2/12">
        <input type="submit" value="Editar" />
      </div>
    </form>
  )
}
