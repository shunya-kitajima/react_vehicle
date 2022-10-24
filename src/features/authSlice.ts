import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../app/store'

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
  const res = await axios.post(`${apiUrl}api/auth/`, auth, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.data
})

export const fetchAsyncRegister = createAsyncThunk(
  'register/post',
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/create/`, auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
  }
)

export const fetchAsyncGetProfile = createAsyncThunk(
  'profile/get',
  async () => {
    const res = await axios.get(`${apiUrl}api/profile/`, {
      headers: {
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token)
    })
    builder.addCase(fetchAsyncGetProfile.fulfilled, (state, action) => {
      return {
        ...state,
        profile: action.payload,
      }
    })
  },
})

export const selectProfile = (state: RootState) => state.auth.profile

export default authSlice.reducer
