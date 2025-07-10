import InputList from '../../../components/Input/InputList'
import InputNumber from '../../../components/Input/InputNumber'
import InputPrice from '../../../components/Input/InputPrice'
import type { ItemInput, Participant } from '../../../store/billStore'
import './ListItem.css'

interface Props {
  listParticipants: Participant[]
  editItem: ItemInput | null
  index: number
  setEditItem: (item: ItemInput | null) => void
  setEditIndex: (index: number | null) => void
  onUpdate: (index: number, updatedItem: ItemInput) => void
}

const ItemEdit = ({
  listParticipants,
  editItem,
  index,
  setEditItem,
  setEditIndex,
  onUpdate,
}: Props) => {
  return (
    <div className="item-edit-container">
      <input
        type="text"
        value={editItem?.name || ''}
        onChange={(e) => setEditItem({ ...editItem!, name: e.target.value })}
      />

      <InputPrice
        amount={editItem?.amount || ''}
        onChange={(e) =>
          setEditItem({
            ...editItem!,
            amount: e,
          })
        }
      />

      <InputNumber
        number={editItem?.quantity || 1}
        onChange={(e) =>
          setEditItem({
            ...editItem!,
            quantity: e,
          })
        }
      />

      <InputList
        value={editItem?.paidBy || ''}
        onChange={(e) => setEditItem({ ...editItem!, paidBy: e })}
        list={listParticipants}
      />

      <span className="item-edit-actions">
        <button
          onClick={() => {
            if (editItem) {
              onUpdate(index, editItem)
              setEditIndex(null)
              setEditItem(null)
            }
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setEditIndex(null)
            setEditItem(null)
          }}
        >
          Cancel
        </button>
      </span>
    </div>
  )
}

export default ItemEdit
