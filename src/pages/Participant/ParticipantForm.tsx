import './Participant.css'

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
        />
        <button onClick={onAdd}>Add</button>
      </div>

      {participantData.length > 0 && <label>List Participant</label>}
      {participantData.length > 0 && (
        <span className="person-row">
          {participantData.map((person, i) => (
            <span className="person-item" key={i}>
              <p>{person}</p>

              <button
                className="remove-button"
                onClick={() => onRemove(person)}
                title="Remove participant"
              >
                x
              </button>
            </span>
          ))}
        </span>
      )}
    </>
  )
}

export default ParticipantForm
