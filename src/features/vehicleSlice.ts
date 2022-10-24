import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../app/store'

const apiUrl = 'http://localhost:8000/'

export const fetchAsyncGetSegments = createAsyncThunk(
  'segment/get',
  async () => {
    const res = await axios.get(`${apiUrl}api/segments/`, {
      headers: {
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  }
)
