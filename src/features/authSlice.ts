import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState, AppThunk } from '../app/store'

const apiUrl = 'http://localhost:8000/'

export interface AuthState {
  profile: {
    id: number
    username: string
  }
}

const initialState: AuthState = {
  profile: {
    id: 0,
    username: '',
  },
}

export const fetchAsyncLogin = createAsyncThunk('login/post', async (auth) => {
  const res = await axios.post(`${apiUrl}api/auth`, auth, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.data
})

export const fetchAsyncRegister = createAsyncThunk(
  'register/post',
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/create`, auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const selectProfile = (state: RootState) => state.auth.profile

export default authSlice.reducer
