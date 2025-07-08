import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../components/Notification/Notification'
import { useBillStore } from '../../store/billStore'
import ParticipantForm from './ParticipantForm'
import DatePicker from '../../components/DatePicker/DatePicker'
import './Participant.css'
import { PAGE_ENUM } from '../../utils/helper'

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

    setBill({
      ...bill,
      participants: [...bill.participants, participantName.trim()],
    })
    setParticipantName('')
  }

  const handleRemoveParticipant = (name: string) => {
    const newParticipants = bill.participants.filter((p) => p !== name)
    const newItems = bill.items.filter((item) => item.paidBy !== name)
    setBill({ ...bill, participants: newParticipants, items: newItems })
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

  return (
    <div className="participant-container">
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
        onAdd={handleAddParticipant}
        onRemove={handleRemoveParticipant}
        onChange={setParticipantName}
        value={participantName}
        participantData={bill.participants}
      />

      <button className="add-items" onClick={handleSubmitParticipant}>
        Move to Add Items
      </button>
    </div>
  )
}

export default Participant
