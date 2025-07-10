import { useState } from 'react'
import { Pencil, X } from 'lucide-react'
import ItemEdit from './ItemEdit'
import './ListItem.css'
import type { ItemInput, Participant } from '../../../store/billStore'
import { formatCurrency } from '../../../utils/helper'

interface Item {
  listParticipants: Participant[]
  items: ItemInput[]
  onRemove: (index: number) => void
  onUpdate: (index: number, updatedItem: ItemInput) => void
}

const ListItem = ({ listParticipants, items, onRemove, onUpdate }: Item) => {
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<ItemInput | null>(null)

  return (
    <div className="list-item-container">
      {items.length > 0 && <label>List Item</label>}

      <ul className="item-list">
        {items.map((item, i) => {
          const participant = listParticipants.find((p) => p.id === item.paidBy)

          return (
            <li key={i} className="item-row">
              {editIndex === i ? (
                <ItemEdit
                  listParticipants={listParticipants}
                  editItem={editItem}
                  index={i}
                  setEditItem={setEditItem}
                  setEditIndex={setEditIndex}
                  onUpdate={onUpdate}
                />
              ) : (
                <>
                  <div className="item-name">
                    <strong>{item.name}</strong> x {item.quantity}
                  </div>
                  <div className="item-meta">
                    <span>{formatCurrency(item.amount)}</span>

                    <span className="item-paidby">
                      paid by <strong>{participant?.name || 'Unknown'}</strong>
                    </span>
                  </div>

                  {item.sharedWith.length === 0 && (
                    <span className="shared-warning">⚠ Not shared yet</span>
                  )}

                  <div className="item-shared">
                    <p className="shared-title">Shared With</p>
                    <ul className="shared-list">
                      {item.sharedWith.map(({ participantId, quantity }) => {
                        const sharedPerson = listParticipants.find(
                          (p) => p.id === participantId
                        )

                        return (
                          <li key={participantId} className="shared-item">
                            <span className="shared-name">
                              {sharedPerson?.name || 'Unknown'} x {quantity}
                            </span>
                            <button
                              onClick={() => {
                                const updatedItem = {
                                  ...item,
                                  sharedWith: item.sharedWith.filter(
                                    (entry) =>
                                      entry.participantId !== participantId
                                  ),
                                }
                                onUpdate(i, updatedItem)
                              }}
                              className="shared-remove"
                              aria-label={`Remove ${participantId}`}
                            >
                              <X size={12} />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <span className="item-action">
                    <button className="icon-btn" onClick={() => onRemove(i)}>
                      <X size={10} />
                    </button>

                    <button
                      className="icon-btn"
                      onClick={() => {
                        setEditIndex(i)
                        setEditItem(item)
                      }}
                    >
                      <Pencil size={10} />
                    </button>
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListItem
