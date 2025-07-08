import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css'
import './DatePicker.css'

interface Props {
  date: Date | string
  onChange: (value: Date) => void
}

const DatePicker = ({ date, onChange }: Props) => {
  return (
    <Flatpickr
      value={date}
      options={{ dateFormat: 'D, d F Y' }}
      onChange={([selectedDate]) => {
        if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
          onChange(selectedDate)
        }
      }}
    />
  )
}

export default DatePicker
