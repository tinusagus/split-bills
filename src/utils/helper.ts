export function formatCurrency(amount: string): string {
  return `Rp${Number(amount).toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

export const PAGE_ENUM = {
  HOME: '/',
  BILL_CREATE: 'bill/create',
  BILL_DETAIL: 'bill/:id',
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return ''

  return new Date(dateString).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
