import type { Participant } from '../../store/billStore'
import './Participant.css'
import ParticipantList from './ParticipantList'

type Props = {
  value: string
  listParticipants: Participant[]
  onAdd: () => void
  onRemove: (name: string) => void
  onChange: (value: string) => void
}

const ParticipantForm = ({
  value,
  listParticipants,
  onAdd,
  onRemove,
  onChange,
}: Props) => {
  return (
    <>
      <label>Add Participant</label>
      <div className="row">
        <input
          className="input-participant"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Alice"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onAdd()
            }
          }}
        />
        <button onClick={onAdd}>Add</button>
      </div>

      <ParticipantList
        list={listParticipants}
        onRemove={onRemove}
        isCanRemove
      />
    </>
  )
}

export default ParticipantForm
