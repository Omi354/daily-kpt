import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Value } from 'react-calendar/dist/esm/shared/types.js'
import { KptData } from './props/props'

const Index: NextPage = () => {
  const [date, setDate] = useState(new Date())
  const [kpt, setKpt] = useState<KptData | null>(null)
  const [mounted, setMounted] = useState(false)
  const kptDates = ['2025-03-10', '2025-03-14', '2025-03-18']
  useEffect(() => {
    setMounted(true)
  }, [])

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
      // 日本時間のまま年月日を取得
      const year = value.getFullYear()
      const month = (value.getMonth() + 1).toString().padStart(2, '0') // 月は0から始まるので+1
      const day = value.getDate().toString().padStart(2, '0')

      const dateString = `${year}-${month}-${day}` // YYYY-MM-DD形式
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/kpts/' + dateString
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      }
      axios({ method: 'get', url: url, headers: headers })
        .then((res: AxiosResponse) => {
          setKpt(res.data.kpt)
        })
        .catch((error: AxiosError) => {
          console.log(error.message)
          setKpt(null)
        })
    }
  }

  return (
    <div>
      <h2>カレンダー</h2>
      {mounted ? (
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          locale="ja-JP"
        />
      ) : null}
      <div>
        <h1>Show KPT</h1>
        {kpt && (
          <div>
            <p>日付： {kpt.date}</p>
            <p>Keep： {kpt.keep}</p>
            <p>Problem： {kpt.problem}</p>
            <p>Try： {kpt.try}</p>
          </div>
        )}
        {!kpt && <p>データがありません</p>}
      </div>
    </div>
  )
}

export default Index
