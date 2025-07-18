interface Props {
  number: number | null
  onChange: (value: number) => void
}

const InputNumber = ({ number, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '') // Only digits

    onChange(Number(raw))
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
      value={number?.toString() || ''}
      placeholder="Item quantity (e.g., 5)"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}

export default InputNumber
