import { NextPage } from 'next'
import { useState } from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Value } from 'react-calendar/dist/esm/shared/types.js'

const Index: NextPage = () => {
  const [date, setDate] = useState(new Date())
  const kptDates = ['2025-03-10', '2025-03-14', '2025-03-18']

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]

      if (kptDates.includes(dateString)) {
        return <span style={{ color: 'red', fontWeight: 'bold' }}>●</span>
      }
    }
    return null
  }

  const handleDateChange = (value: Value) => {
    // null チェックを行い、Date型の場合のみsetDateを呼び出す
    if (value instanceof Date) {
      setDate(value)
      console.log(value)
      console.log(date)
    }
  }

  return (
    <div>
      <h2>カレンダー</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
      />
    </div>
  )
}

export default Index
