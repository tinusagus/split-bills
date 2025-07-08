export function formatCurrency(amount: string): string {
  return `Rp${Number(amount).toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}
