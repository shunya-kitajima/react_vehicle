import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { fetchAuth } from '../hooks/fetchAuth'

const { fetchAsyncLogin, fetchAsyncGetProfile } = fetchAuth()

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
