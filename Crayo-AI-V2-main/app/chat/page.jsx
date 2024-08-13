import React from 'react'
import { Box } from '@mui/material'
import GeminiBody from '../components/GeminiBody'
import Sidebar from '../components/Sidebar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'

export default function page() {
  return (
    <Box className="flex contain">
      <Sidebar/>
      <GeminiBody/>
    </Box>
  )
}