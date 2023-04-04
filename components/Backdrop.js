import { Backdrop as MuiBackdrop, CircularProgress } from '@mui/material'
import React, { useContext } from 'react'

export default function Backdrop({loading}) {
  return (
    <MuiBackdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </MuiBackdrop>

  )
}
