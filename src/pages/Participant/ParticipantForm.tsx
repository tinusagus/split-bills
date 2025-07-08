import './Participant.css'
import ParticipantList from './ParticipantList'

type Props = {
  value: string
  onAdd: () => void
  onRemove: (value: string) => void
  onChange: (value: string) => void
  participantData: string[]
}

const ParticipantForm = ({
  value,
  onAdd,
  onRemove,
  onChange,
  participantData,
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
        participantData={participantData}
        onRemove={onRemove}
        isCanRemove
      />
    </>
  )
}

export default ParticipantForm
