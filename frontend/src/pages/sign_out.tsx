import { NextPage } from 'next'
import router from 'next/router'
import { useEffect } from 'react'

const SignOut: NextPage = () => {
  useEffect(() => {
    localStorage.clear()
    router.push('/')
  }, [])
  return <></>
}

export default SignOut
