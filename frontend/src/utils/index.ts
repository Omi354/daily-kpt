import axios, { AxiosError, AxiosResponse } from 'axios'

export const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      console.log(error.message)
      throw error
    })
