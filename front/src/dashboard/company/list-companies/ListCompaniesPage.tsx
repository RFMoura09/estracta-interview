import { useEffect, useState } from 'react'
import PageTitle from '../../_shared/page-title/PageTitle'
import TableData from '../../_shared/table-data/TableData'
import { _companyService } from '../_shared/CompanyService'
import { CompanyModel } from '../_shared/CompaniesModels'
import { useLoader } from '../../../_shared/ui/loader/LoaderContext'
import { _tokenService } from '../../../_shared/auth/TokenService'

const headers = ['CNPJ', 'Nome Razão', 'Nome Fantasia', 'CNAE']

export default function ListCompaniesPage() {
  const [companies, updateCompanies] = useState<CompanyModel[]>([])
  const [totalPages, updateTotalPages] = useState<number>(0)
  const [sortedHeader, setSortedHeader] = useState<number>(-1)

  const [name, setName] = useState<string>('')

  const { emitLoader } = useLoader();

  useEffect(() => {
    getTotalPages()
  }, [])

  const getTotalPages = () => {
    emitLoader(true)
    return _companyService.getTotalPages(name, {
      headers: {'authorization': 'bearer ' + _tokenService.getToken()}
    }).then((res) => {
      updateTotalPages(res)
      emitLoader(false)
    })
  }

  const loadCompanies = (header: number, page:number) => {
    emitLoader(true)
    _companyService.getCompanies({
      order_cnpj: JSON.stringify(header === 0),
      order_name: JSON.stringify(header === 1),
      order_fantasy_name: JSON.stringify(header === 2),
      order_cnae: JSON.stringify(header === 3),
      ...(name ? { name } : {}),
      page: String(page)
    }, {
      headers: {'authorization': 'bearer ' + _tokenService.getToken()}
    }).then((res) => {
      updateCompanies(res)
      emitLoader(false)
    })
  }

  useEffect(() => {
    loadCompanies(sortedHeader, 0)
  }, [sortedHeader])

  useEffect(() => {
    getTotalPages().then(() => {
      loadCompanies(sortedHeader, 0)
    })
  }, [name])

  const companiesByPage = (page: number) => {
    loadCompanies(sortedHeader, page)
  }

  return (
    <div>
      <PageTitle title='Empresas' />
      <TableData 
        headers={headers}
        data={companies} 
        totalPages={totalPages} 
        onHeaderClick={(index) => setSortedHeader(index)} 
        onSearch={(search) => setName(search)}
        onPageChange={companiesByPage}
      />
    </div>
  )
}
