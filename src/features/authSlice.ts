import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState, AppThunk } from '../app/store'
import { fetchCount } from './counter/counterAPI'

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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const selectProfile = (state: RootState) => state.auth.profile

export default authSlice.reducer
