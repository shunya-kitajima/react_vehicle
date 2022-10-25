import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import vehicleSlice from '../features/vehicleSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
