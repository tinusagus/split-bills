import type { ItemInput } from '@/store/billStore'
import './ListItem.css'

type Participant = {
  id: string
  name: string
}

type ListItemProps = {
  listParticipants: Participant[]
  items: ItemInput[]
  onRemove: (index: number) => void
  onUpdate: (index: number) => void
}

function ListItem({
  items,
  listParticipants,
  onRemove,
  onUpdate,
}: ListItemProps) {
  const getParticipantName = (id: string) =>
    listParticipants.find((p) => p.id === id)?.name ?? 'Unknown'

  return (
    <div className="list-items">
      {items.map((item, index) => (
        <div key={index} className="item-card">
          <div className="item-details">
            <div className="item-name">{item.name}</div>
            <div className="item-amount">Rp {item.amount}</div>
            <div className="item-paid">
              Paid by: {getParticipantName(item.paidBy)}
            </div>
          </div>
          <div className="item-actions">
            <button className="edit" onClick={() => onUpdate(index)}>
              Edit
            </button>
            <button className="remove" onClick={() => onRemove(index)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListItem
