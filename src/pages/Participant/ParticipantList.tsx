import './Participant.css'

type Props = {
  onRemove?: (value: string) => void
  participantData: string[]
  isCanRemove?: boolean
}

const ParticipantList = ({
  onRemove,
  participantData,
  isCanRemove = false,
}: Props) => {
  return (
    <>
      {participantData.length > 0 && <label>List Participant</label>}
      {participantData.length > 0 && (
        <span className="person-row">
          {participantData.map((person, i) => (
            <span className="person-item" key={i}>
              <p>{person}</p>

              {isCanRemove && (
                <button
                  className="remove-button"
                  onClick={() => onRemove?.(person)}
                  title="Remove participant"
                >
                  x
                </button>
              )}
            </span>
          ))}
        </span>
      )}
    </>
  )
}

export default ParticipantList
