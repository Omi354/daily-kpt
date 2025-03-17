import { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils'

const HealthCheck: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data)

  return (
    <div>
      <h1>Health Check</h1>
      <div>レスポンスメッセージ： {data.message}</div>
    </div>
  )
}

export default HealthCheck
