import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { NextPage } from 'next'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { KptData } from './props/props'

const CreateKpt: NextPage = () => {
  const { handleSubmit, control } = useForm<KptData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      keep: '',
      problem: '',
      try: '',
    },
  })

  const validationRules = {
    date: {
      required: '日付は必須です',
    },
    keep: {
      required: 'KEEPを入力してください',
    },
    problem: {
      required: 'PROBLEMを入力してください',
    },
    try: {
      required: 'TRYを入力してください',
    },
  }

  const onSubmit: SubmitHandler<KptData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/kpts'
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    const requestData = {
      kpt: data,
    }

    axios({ method: 'POST', url: url, headers: headers, data: requestData })
      .then((res: AxiosResponse) => {
        console.log(res.data)
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
            Create
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <Controller
            name="date"
            control={control}
            rules={validationRules.date}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="date"
                label="日付"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="keep"
            control={control}
            rules={validationRules.keep}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="KEEP"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="problem"
            control={control}
            rules={validationRules.problem}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="PROBLEM"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="try"
            control={control}
            rules={validationRules.try}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="TRY"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button variant="contained" type="submit">
            作成
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default CreateKpt
