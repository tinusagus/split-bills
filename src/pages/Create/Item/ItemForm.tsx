import { useState, useEffect } from 'react'
import type { ItemInput } from '@/store/billStore'
import InputPrice from '@/components/Input/InputPrice'
import InputList from '@/components/Input/InputList'
import './ItemForm.css'

type Participant = {
  id: string
  name: string
}

type ItemFormProps = {
  participants: Participant[]
  initialItem?: ItemInput
  onSubmit: (item: ItemInput) => void
  onCancel: () => void
}

function ItemForm({
  participants,
  initialItem,
  onSubmit,
  onCancel,
}: ItemFormProps) {
  const [item, setItem] = useState<ItemInput>({
    name: '',
    amount: '',
    paidBy: '',
    quantity: 1,
    sharedWith: [],
  })

  // Load initial data if editing
  useEffect(() => {
    if (initialItem) {
      setItem(initialItem)
    }
  }, [initialItem])

  const handleSharedWithChange = (participantId: string, checked: boolean) => {
    const updated = checked
      ? [...item.sharedWith, { participantId, quantity: 1 }]
      : item.sharedWith.filter((s) => s.participantId !== participantId)

    setItem({ ...item, sharedWith: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!item.name || !item.amount || !item.paidBy) {
      alert('Please complete all required fields.')
      return
    }

    if (Number(item.amount) <= 0) {
      alert('Amount must be greater than 0.')
      return
    }

    if (item.sharedWith.length === 0) {
      alert('Please select at least one participant to share with.')
      return
    }

    onSubmit({
      ...item,
      amount: String(Number(item.amount)), // sanitize
      quantity: item.quantity || 1,
    })
  }

  return (
    <form
      className="item-form"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <input
        type="text"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        placeholder="Item name"
        required
      />

      <InputPrice
        amount={item.amount}
        onChange={(val) => setItem({ ...item, amount: val })}
      />

      <InputList
        value={item.paidBy}
        list={participants}
        onChange={(val) => setItem({ ...item, paidBy: val })}
      />

      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })}
        placeholder="Quantity"
      />

      <div className="shared-with-section">
        <label>
          <strong>Shared With:</strong>{' '}
        </label>
        <div className="shared-checkbox-list">
          {participants.map((p) => (
            <label key={p.id} className="checkbox-item">
              <input
                type="checkbox"
                checked={item.sharedWith.some((s) => s.participantId === p.id)}
                onChange={(e) => handleSharedWithChange(p.id, e.target.checked)}
              />
              {p.name}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}

export default ItemForm
