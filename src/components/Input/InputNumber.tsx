import { formatCurrency } from '../../utils/helper'

interface Props {
  amount: string
  onChange: (value: string) => void
}

const InputNumber = ({ amount, onChange }: Props) => {
  const cleaned = amount.replace(/^0+/, '') || '0'

  const formatted = formatCurrency(cleaned)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '') // Only digits
    onChange(raw)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
    if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault() // Block non-digit keys
    }
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      value={formatted}
      placeholder="Item price (e.g., Rp10.000,00)"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}

export default InputNumber
