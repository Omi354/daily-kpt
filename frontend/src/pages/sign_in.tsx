import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }

    axios({ method: 'POST', url: url, headers: headers, data: data })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
        router.push('/')
      })
      .catch((error: AxiosError) => {
        console.log(error.message)
      })
  }

  return (
    <Box>
      <Container maxWidth="sm">
        <Box>
          <Typography component="h2" sx={{ fontSize: 32, fontWeight: 'bold' }}>
            Sign in
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} type="text" label="メールアドレス" />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField {...field} type="password" label="パスワード" />
            )}
          />
          <Button variant="contained" type="submit">
            ログイン
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default SignIn
