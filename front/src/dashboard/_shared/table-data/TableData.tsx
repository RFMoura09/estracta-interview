import React, { useEffect, useState } from 'react'
import TableCel from './tableCel/TableCel'
import { BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import './table-data.scss'
import { TableDataProps } from './TableDataProps';
import { throttle } from '../../../_shared/utils/Helpers';

export default function TableData(props: TableDataProps) {
  const [currentPage, goToPage] = useState(0)
  const [emitPageChanged, setEmitPageChanged] = useState(false)
  const [headerSelected, changeHeaderSelected] = useState(-1)

  const [search, setSearch] = useState('')

  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === props.totalPages - 1

  const goToPageAndEmit = (page: React.SetStateAction<number>, emitEvent = true) => {
    setEmitPageChanged(emitEvent)
    goToPage(page)
  }

  const goToFirstPage = () => goToPageAndEmit(0)
  const goToLastPage = () => goToPageAndEmit(props.totalPages - 1)
  const goToNextPage = () => goToPageAndEmit((state) => isLastPage ? state : state + 1)
  const goToPreviousPage = () => goToPageAndEmit((state) =>  isFirstPage ? state : state - 1)

  useEffect(() => {
    if(!emitPageChanged) return
    props.onPageChange(currentPage)
  }, [currentPage])

  useEffect(() => {
    goToPageAndEmit(0, false)
    props.onHeaderClick(headerSelected)
  }, [headerSelected])

  const startSearch = () => {
    goToPageAndEmit(0, false)
    props.onSearch(search)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      startSearch()
    }
  }

  return <>
    <div className='md:flex items-stretch gap-2'>
      <div className="md:w-2/12 hidden md:block">
        <button onClick={startSearch}>Pesquisar</button>
      </div>
      <div className='md:w-10/12'>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder='Nome Razão'
          type="text" 
        />
      </div>
    </div>
    <div className={`grid min-w-[600px] md:w-full max-h-[60vh] overflow-scroll`} style={{
      gridTemplateColumns: `repeat(${props.headers.length}, 1fr)`
    }}>
      {props.headers.map((header, i) => <TableCel 
        key={i} 
        label={header} 
        header
        headerClicked={headerSelected === i}
        onHeaderClick={() => changeHeaderSelected(headerSelected === i ? -1 : i)} 
      />)}
      {props.data.map((obj, row) => 
        Object.values(obj).map((field, column) => <TableCel key={column} label={field} isEven={row % 2 === 0} />)
      )}
    </div>
    <div className='md:flex w-full justify-between items-center mt-5'>
      <p className='font-medium'>Página {currentPage + 1} de {props.totalPages}</p>
      <div className='flex space-x-2'>
        <button onClick={goToFirstPage} className='tdc-pg-btn'><BsChevronDoubleLeft /></button>
        <button onClick={goToPreviousPage} disabled={isFirstPage} className='tdc-pg-btn'><BsChevronLeft /></button>
        <button onClick={goToNextPage} disabled={isLastPage} className='tdc-pg-btn'><BsChevronRight /></button>
        <button onClick={goToLastPage} className='tdc-pg-btn'><BsChevronDoubleRight /></button>
      </div>
    </div>
  </>
}
