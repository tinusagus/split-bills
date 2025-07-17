import { useEffect, useState } from 'react'
import { useBillStore, type ItemInput } from '../../store/billStore'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../components/Notification/Notification'
import './CreateBill.css'
import ListItem from './Item/ListItem'
import { formatDate } from '@/utils/helper'
import ParticipantList from '@/components/Participant/ParticipantList'
import ResponsiveDialog from '@/components/ResponsiveDialog'
import ItemForm from './Item/ItemForm'

function CreateBill() {
  const { bill, setBill } = useBillStore()
  const navigate = useNavigate()

  const [showModals, setShowModals] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<ItemInput | null>(null)

  useEffect(() => {
    const isEmpty =
      !bill.title || !bill.createdAt || bill.participants.length === 0

    if (isEmpty) {
      navigate('/', { replace: true })
    }
  }, [bill, navigate])

  const handleSaveItem = (newItem: ItemInput) => {
    const cleanedItem: ItemInput = {
      ...newItem,
      amount: String(Number(newItem.amount)),
      quantity: newItem.quantity || 1,
    }

    if (editIndex !== null) {
      const updatedItems = [...bill.items]
      updatedItems[editIndex] = cleanedItem
      setBill({ ...bill, items: updatedItems })
      showToast({ text: 'Item updated successfully!', type: 'success' })
    } else {
      setBill({ ...bill, items: [...bill.items, cleanedItem] })
      showToast({ text: 'Item added successfully!', type: 'success' })
    }

    setShowModals(false)
    setEditIndex(null)
    setEditItem(null)
  }

  const handleRemoveItem = (index: number) => {
    const newItems = bill.items.filter((_, i) => i !== index)
    setBill({ ...bill, items: newItems })
  }

  const handleEditItem = (index: number) => {
    const itemToEdit = bill.items[index]
    setEditItem(itemToEdit)
    setEditIndex(index)
    setShowModals(true)
  }

  const handleRemoveParticipant = (id: string) => {
    const newParticipants = bill.participants.filter((p) => p.id !== id)
    const newItems = bill.items
      .map((item) => ({
        ...item,
        sharedWith: item.sharedWith.filter(
          (entry) => entry.participantId !== id
        ),
      }))
      .filter((item) => item.paidBy !== id)

    setBill({
      ...bill,
      participants: newParticipants,
      items: newItems,
    })
  }

  const handleSubmit = () => {
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

    console.log('Bill submitted:', bill)
    // TODO: Add Firebase logic or sharing logic
  }

  return (
    <div className="create-bill-container">
      <div className="bill-header">
        <div className="bill-title">{bill.title}</div>
        <div className="bill-date">{formatDate(bill.createdAt)}</div>
      </div>

      <ParticipantList
        list={bill.participants}
        onRemove={handleRemoveParticipant}
      />

      {bill.participants.length > 0 && (
        <>
          <div className="add-item-container">
            <button
              onClick={() => {
                setEditIndex(null)
                setEditItem(null)
                setShowModals(true)
              }}
              className="add-item-button"
            >
              + Add Item
            </button>
          </div>

          <ListItem
            listParticipants={bill.participants}
            items={bill.items}
            onRemove={handleRemoveItem}
            onUpdate={handleEditItem}
          />

          <ResponsiveDialog
            open={showModals}
            onClose={() => setShowModals(false)}
          >
            <ItemForm
              participants={bill.participants}
              initialItem={
                editItem ?? {
                  name: '',
                  amount: '',
                  paidBy: '',
                  quantity: 1,
                  sharedWith: [],
                }
              }
              onCancel={() => {
                setShowModals(false)
                setEditItem(null)
                setEditIndex(null)
              }}
              onSubmit={handleSaveItem}
            />
          </ResponsiveDialog>

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
