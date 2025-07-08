export function formatCurrency(amount: string): string {
  return `Rp${Number(amount).toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

export const PAGE_ENUM = {
  HOME: '/',
  BILL_CREATE: '/bill/create',
  BILL_DETAIL: '/bill/:id',
}
