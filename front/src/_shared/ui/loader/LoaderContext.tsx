import { useContext, useState } from 'react'
import { createContext } from "react";
import Loader from './Loader';

interface ILoaderContext {
  emitLoader: React.Dispatch<React.SetStateAction<boolean>>
}

const LoaderContext = createContext<ILoaderContext|null>(null);

export function LoaderProvider({ children }) {
  const [isLoading, emitLoader] = useState<boolean>(false)

  return (
    <LoaderContext.Provider value={{emitLoader}}>
      {isLoading && <Loader />}
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => useContext(LoaderContext) as ILoaderContext
