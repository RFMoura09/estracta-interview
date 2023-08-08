import React, { useEffect } from 'react'
import PageTitle from '../../_shared/page-title/PageTitle'
import InputMask from 'react-input-mask';
import { useToast } from '../../../_shared/ui/toast/ToastContext';
import { useLoader } from '../../../_shared/ui/loader/LoaderContext';
import { useForm } from 'react-hook-form';
import { AddCompanyModel, CompanyUtils } from '../_shared/CompaniesModels';
import { _companyService } from '../_shared/CompanyService';
import { useNavigate } from 'react-router-dom';
import { _tokenService } from '../../../_shared/auth/TokenService';


export default function AddCompanyPage() {
  const { emitLoader } = useLoader();
  const { emitToast } = useToast();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<AddCompanyModel>()

  const addCompany = (data: AddCompanyModel) => {
    emitLoader(true)
    _companyService.addCompany(CompanyUtils.toModel(data), {
      headers: {'authorization': 'bearer ' + _tokenService.getToken()}
    })
    .then(() => {
      emitToast('Empresa Adicionada Com Sucesso!')
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
    <form onSubmit={handleSubmit(addCompany)}>
      <PageTitle title='Adicionar Empresa' />
      <div className='md:grid grid-cols-2 gap-5'>
        <label>
          <span>CNPJ</span>
          <InputMask 
            className='input' 
            mask={CompanyUtils.cnpjMask} 
            maskChar={null}
            {...register('cnpj', { required: true, pattern: CompanyUtils.cnpjRegex })} 
          />
          {errors?.cnpj && <p className='error'>CNPJ inválido</p>}
        </label>
        <label>
          <span>CNAE</span>
          <InputMask 
            className='input' 
            mask={CompanyUtils.cnaeMask} 
            maskChar={null}
            {...register('cnae', { required: true, pattern: CompanyUtils.cnaeRegex })} 
          />
          {errors?.cnae && <p className='error'>CNAE inválido</p>}
        </label>
      </div>
      <label>
        <span>Nome Razão</span>
        <input type="text" {...register('name', { required: true })}  />
        {errors?.name && <p className='error'>Nome Razão é obrigatório</p>}
      </label>
      <label>
        <span>Nome Fantasia</span>
        <input type="text" {...register('name_fantasy', { required: true })} />
        {errors?.name_fantasy && <p className='error'>Nome Fantasia é obrigatório</p>}
      </label>
      <div className="flex justify-between lg:w-2/12">
        <input type="submit" value="Adicionar" />
      </div>
    </form>
  )
}
