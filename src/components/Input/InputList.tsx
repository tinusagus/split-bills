import type { Participant } from '../../store/billStore'

interface ItemInput {
  value: string
  list: Participant[]
  onChange: (value: string) => void
}

const InputList = ({ value, list, onChange }: ItemInput) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option key="who" value="">
        Who paid?
      </option>
      {list.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  )
}

export default InputList
