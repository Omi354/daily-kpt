import { TextField } from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { KptData } from './props/props'

const ShowKpt: NextPage = () => {
  const [kpt, setKpt] = useState<KptData | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const date = e.target.value
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/kpts/' + date
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
  return (
    <div>
      <h1>Show KPT</h1>
      <TextField type="date" onChange={(e) => handleChange(e)} />
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
  )
}

export default ShowKpt
