export function cnpjFormatter(cnpj: string): string {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export function cnaeFormatter(cnae: string): string {
  return cnae.replace(/^(\d{4})(\d{1})(\d{2})/, '$1-$2/$3')
}

export function removeSymbols(text: string): string {
  return text.replace(/\D/g, '')
}