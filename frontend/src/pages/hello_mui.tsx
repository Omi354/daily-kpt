import { css } from '@emotion/react'
import { Button } from '@mui/material'

const buttonCSS = css({
  padding: '100px',
  margin: '100px',
})

const HelloMui = () => {
  return (
    <>
      <Button variant="contained" css={buttonCSS}>
        Hello MUI
      </Button>
      <Button variant="outlined" css={buttonCSS}>
        Hello MUI
      </Button>
      <Button variant="contained" color="error" css={buttonCSS}>
        Hello MUI
      </Button>
    </>
  )
}

export default HelloMui
