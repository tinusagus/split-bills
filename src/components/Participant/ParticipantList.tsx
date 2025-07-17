import type { Participant } from '../../store/billStore'
import './Participant.css'

type Props = {
  list: Participant[]
  isCanRemove?: boolean
  isNeedTitle?: boolean
  onRemove: (id: string) => void
}

const ParticipantList = ({
  list,
  isNeedTitle = true,
  isCanRemove = false,
  onRemove,
}: Props) => {
  return (
    <>
      {list.length > 0 && isNeedTitle && <label>List Participant</label>}

      {list.length > 0 && (
        <span className="person-row">
          {list.map((participant, i) => (
            <span className="person-item" key={i}>
              <p>{participant.name}</p>

              {isCanRemove && (
                <button
                  className="remove-button"
                  onClick={() => onRemove(participant.id)}
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
