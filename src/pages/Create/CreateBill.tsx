// import { addDoc, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useBillStore, type ItemInput } from '../../store/billStore'
// import { db } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../components/Notification/Notification'
import ParticipantList from '../Participant/ParticipantList'
import './CreateBill.css'
import InputPrice from '../../components/Input/InputPrice'
import InputList from '../../components/Input/InputList'
import ListItem from './Item/ListItem'

function CreateBill() {
  const { bill, setBill } = useBillStore()
  const navigate = useNavigate()

  const listParticipants = bill.participants

  const [item, setItem] = useState<ItemInput>({
    name: '',
    amount: '',
    paidBy: '',
    quantity: 1,
    sharedWith: [],
  })

  useEffect(() => {
    const isEmpty =
      !bill.title || !bill.createdAt || bill.participants.length === 0

    if (isEmpty) {
      navigate('/', { replace: true }) // 👈 redirect to home
    }
  }, [bill, navigate])

  const handleAddItem = () => {
    if (!item.name || !item.amount || !item.paidBy) {
      showToast({
        text: 'Please fill in all item fields.',
        type: 'warning',
      })
      return
    }

    const cleanedItem: ItemInput = {
      ...item,
      amount: String(Number(item.amount)), // Ensure numeric string
      quantity: item.quantity || 1,
      sharedWith: [], // start empty (Option 1 flow)
    }

    setBill({
      ...bill,
      items: [...bill.items, cleanedItem],
    })

    setItem({
      name: '',
      amount: '',
      paidBy: '',
      quantity: 1,
      sharedWith: [], // reset cleanly
    })

    showToast({
      text: 'Item added successfully!',
      type: 'success',
    })
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

    console.log('Bill submitted:', bill)
  }

  const handleChangeItemAmount = (value: string) => {
    setItem({ ...item, amount: value })
  }

  const handleUpdateItem = (index: number, updatedItem: ItemInput) => {
    const newItems = [...bill.items]
    newItems[index] = updatedItem
    setBill({ ...bill, items: newItems })
  }

  const handleRemoveParticipant = (id: string) => {
    // Remove from participants list
    const newParticipants = bill.participants.filter((p) => p.id !== id)

    const newItems = bill.items
      .map((item) => {
        // Remove participant from sharedWith array
        const newSharedWith = item.sharedWith.filter(
          (entry) => entry.participantId !== id
        )

        return {
          ...item,
          sharedWith: newSharedWith,
        }
      })
      .filter((item) => item.paidBy !== id) // Remove if the participant paid for the item

    setBill({
      ...bill,
      participants: newParticipants,
      items: newItems,
    })
  }

  return (
    <div className="create-bill-container">
      <label>{bill.title}</label>

      <ParticipantList
        list={listParticipants}
        onRemove={handleRemoveParticipant}
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

          <InputPrice amount={item.amount} onChange={handleChangeItemAmount} />

          <InputList
            value={item.paidBy}
            list={bill.participants}
            onChange={(e) => setItem({ ...item, paidBy: e })}
          />

          <button onClick={handleAddItem}>Add Item</button>

          <ListItem
            listParticipants={bill.participants}
            items={bill.items}
            onRemove={handleRemoveItem}
            onUpdate={handleUpdateItem}
          />

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
