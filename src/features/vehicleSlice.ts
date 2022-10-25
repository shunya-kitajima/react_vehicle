import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../app/store'
import { SegmentType, BrandType, VehicleType } from '../../types/types'

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

export const fetchAsyncCreateSegment = createAsyncThunk(
  'segment/post',
  async (segment) => {
    const res = await axios.post(`${apiUrl}api/segments/`, segment, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  }
)

export const fetchAsyncUpdateSegment = createAsyncThunk(
  'segment/put',
  async (segment) => {
    const res = await axios.put(`${apiUrl}api/segments/${segment.id}/`, segment)
  }
)
