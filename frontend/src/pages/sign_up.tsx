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

const SignUp: NextPage = () => {
  const router = useRouter()

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const validationRules = {
    email: {
      required: 'メールアドレスを入力してください',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: '正しい形式のメールアドレスを入力してください。',
      },
    },
    password: {
      required: 'パスワードを入力してください',
    },
  }

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'
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
            Sign Up
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <Controller
            name="email"
            control={control}
            rules={validationRules.email}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="メールアドレス"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={validationRules.password}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="パスワード"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button variant="contained" type="submit">
            登録する
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default SignUp
