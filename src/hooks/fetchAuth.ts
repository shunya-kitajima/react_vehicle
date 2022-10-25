import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { AuthType } from '../../types/types'

const apiUrl = 'http://localhost:8000/'

export const fetchAuth = () => {
  const fetchAsyncLogin = createAsyncThunk(
    'login/post',
    async (auth: AuthType) => {
      const res = await axios.post(`${apiUrl}api/auth/`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return res.data
    }
  )

  const fetchAsyncRegister = createAsyncThunk(
    'register/post',
    async (auth: AuthType) => {
      const res = await axios.post(`${apiUrl}api/create/`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return res.data
    }
  )

  const fetchAsyncGetProfile = createAsyncThunk('profile/get', async () => {
    const res = await axios.get(`${apiUrl}api/profile/`, {
      headers: {
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  })

  return { fetchAsyncLogin, fetchAsyncRegister, fetchAsyncGetProfile }
}
