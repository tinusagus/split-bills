// import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { useBillStore, type ItemInput } from '../../store/billStore'
// import { db } from '../../utils/firebase'
// import { useNavigate } from 'react-router-dom'
import { showToast } from '../../components/Notification/Notification'
import InputNumber from '../../components/Input/InputNumber'
import { formatCurrency } from '../../utils/helper'
import './CreateBill.css'

function CreateBill() {
  const { bill, setBill } = useBillStore()
  // const navigate = useNavigate()

  const [item, setItem] = useState<ItemInput>({
    name: '',
    amount: '',
    paidBy: '',
    quantity: 1,
    sharedBy: {},
  })

  const toggleDark = () => {
    document.body.classList.toggle('dark')
  }

  const handleAddItem = () => {
    if (
      !item.name ||
      !item.amount ||
      !item.paidBy
      // !item.sharedBy ||
      // Object.values(item.sharedBy).every((qty) => qty <= 0)
    ) {
      showToast({
        text: 'Please fill in all item fields.',
        type: 'warning',
      })
      return
    }

    setBill({
      ...bill,
      items: [...bill.items, item],
    })

    setItem({ name: '', amount: '', paidBy: '', quantity: 1, sharedBy: {} })
  }

  const handleRemoveItem = (index: number) => {
    const newItems = bill.items.filter((_, i) => i !== index)
    setBill({ ...bill, items: newItems })
  }

  const handleSubmit = async () => {
    if (
      !bill.title ||
      bill.participants.length === 0 ||
      bill.items.length === 0
    ) {
      showToast({
        text: 'Please fill in all fields before submitting.',
        type: 'warning',
      })

      return
    }

    // const docRef = await addDoc(collection(db, 'bills'), bill)
    // navigate(`/bill/${docRef.id}`)
    // navigate(`/bill/${docRef.id}`)

    console.log('Bill submitted:', bill)
  }

  const handleChangeItemAmount = (value: string) => {
    setItem({ ...item, amount: value })
  }

  return (
    <div className="create-bill-container">
      <button onClick={toggleDark}>Toggle Dark Mode</button>

      <label>Bill Title</label>
      <input
        type="text"
        value={bill.title}
        onChange={(e) => setBill({ ...bill, title: e.target.value })}
        placeholder="e.g., Dinner with friends"
      />

      {bill.participants.length > 0 && (
        <>
          <label>Add Item</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder="Item name (e.g., Pizza)"
          />

          <InputNumber amount={item.amount} onChange={handleChangeItemAmount} />

          <select
            value={item.paidBy}
            onChange={(e) => setItem({ ...item, paidBy: e.target.value })}
          >
            <option value="">Who paid?</option>
            {bill.participants.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>

          <div>
            <label>Who shared this item?</label>
            {bill.participants.map((p) => (
              <div key={p} className="shared-by-row">
                <label>
                  <input
                    type="number"
                    min={0}
                    value={item.sharedBy?.[p] || 0}
                    onChange={(e) => {
                      const qty = Number(e.target.value)
                      setItem((prev) => ({
                        ...prev,
                        sharedBy: { ...prev.sharedBy, [p]: qty },
                      }))
                    }}
                  />
                  {p}
                </label>
              </div>
            ))}
          </div>

          <button onClick={handleAddItem}>Add Item</button>

          <ul className="item-list">
            {bill.items.map((item, i) => (
              <li key={i} className="item-row">
                <div className="item-name">
                  <strong>{item.name}</strong> x {item.quantity}
                </div>
                <div className="item-meta">
                  <span>{formatCurrency(item.amount)}</span>

                  <span className="item-paidby">
                    paid by <strong>{item.paidBy}</strong>
                  </span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(i)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <button className="submit-button" onClick={handleSubmit}>
            Save and Share
          </button>
        </>
      )}

      {bill.participants.length === 0 && (
        <p className="warning-text">
          Please add at least one participant to add items.
        </p>
      )}
    </div>
  )
}

export default CreateBill
