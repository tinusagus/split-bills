import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '@/components/Notification/Notification'
import { useBillStore } from '@/store/billStore'
import DatePicker from '@/components/DatePicker/DatePicker'
import { PAGE_ENUM } from '@/utils/helper'
import ParticipantForm from '@/components/Participant/ParticipantForm'
import './Home.css'

const Participant = () => {
  const { bill, setBill } = useBillStore()
  const [participantName, setParticipantName] = useState('')
  const navigate = useNavigate()

  const createdAt = bill.createdAt
    ? new Date(bill.createdAt)
    : new Date().toISOString()

  const handleAddParticipant = () => {
    if (participantName.trim() === '') {
      showToast({
        text: 'Please fill participant name.',
        type: 'warning',
      })
      return
    }

    const newParticipant = {
      id: Date.now().toString(),
      name: participantName.trim(),
    }

    setBill({
      ...bill,
      participants: [...bill.participants, newParticipant],
    })
    setParticipantName('')
  }

  const handleSubmitParticipant = () => {
    if (bill.participants.length === 0 || !bill.title || !bill.createdAt) {
      showToast({
        text: 'Please fill in all fields before submitting.',
        type: 'warning',
      })

      return
    }

    return navigate(PAGE_ENUM.BILL_CREATE)
  }

  const handleRemoveParticipant = (id: string) => {
    // Remove from participants list
    const newParticipants = bill.participants.filter((p) => p.id !== id)

    // Hapus participant dari sharedWith dan juga dari paidBy
    const newItems = bill.items
      .map((item) => {
        const newSharedWith = item.sharedWith.filter(
          (entry) => entry.participantId !== id
        )

        return {
          ...item,
          sharedWith: newSharedWith,
        }
      })
      .filter((item) => item.paidBy !== id)

    setBill({
      ...bill,
      participants: newParticipants,
      items: newItems,
    })
  }

  return (
    <div className="home-container">
      <label>Bill Title</label>
      <input
        type="text"
        value={bill.title}
        onChange={(e) => setBill({ ...bill, title: e.target.value })}
        placeholder="e.g., Dinner with friends"
      />

      <label>Bill Date</label>
      <DatePicker
        date={createdAt}
        onChange={(date) => {
          setBill({
            ...bill,
            createdAt: date.toISOString(),
          })
        }}
      />

      <ParticipantForm
        listParticipants={bill.participants}
        onAdd={handleAddParticipant}
        onChange={setParticipantName}
        onRemove={handleRemoveParticipant}
        value={participantName}
      />

      <button className="add-items" onClick={handleSubmitParticipant}>
        Move to Add Items
      </button>
    </div>
  )
}

export default Participant
