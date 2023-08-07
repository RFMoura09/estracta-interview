import { useEffect, useState } from 'react'
import PageTitle from '../../_shared/page-title/PageTitle'
import TableData from '../../_shared/table-data/TableData'
import { _companyService } from '../_shared/CompanyService'
import { CompanyModel } from '../_shared/CompaniesModels'
import { useLoader } from '../../../_shared/ui/loader/LoaderContext'

const headers = ['CNPJ', 'Nome', 'Nome Fantasia', 'CNAE']

export default function ListCompaniesPage() {
  const [companies, updateCompanies] = useState<CompanyModel[]>([])
  const [totalPages, updateTotalPages] = useState<number>(0)
  const [sortedHeader, setSortedHeader] = useState<number>(-1)

  const { emitLoader } = useLoader();

  useEffect(() => {
    _companyService.getTotalPages().then(updateTotalPages)
  }, [])

  const loadCompanies = (header: number, page:number) => {
    emitLoader(true)
    _companyService.getCompanies({
      order_cnpj: JSON.stringify(header === 0),
      order_name: JSON.stringify(header === 1),
      order_fantasy_name: JSON.stringify(header === 2),
      order_cnae: JSON.stringify(header === 3),
      page: String(page)
    }).then((res) => {
      updateCompanies(res)
      emitLoader(false)
    })
  }

  useEffect(() => {
    loadCompanies(sortedHeader, 0)
  }, [sortedHeader])

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
        onPageChange={companiesByPage}
      />
    </div>
  )
}
