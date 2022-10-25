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
  async (segment: Omit<SegmentType, 'id'>) => {
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
  async (segment: SegmentType) => {
    const res = await axios.put(
      `${apiUrl}api/segments/${segment.id}/`,
      segment,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.token}`,
        },
      }
    )
    return res.data
  }
)

export const fetchAsyncDeleteSegment = createAsyncThunk(
  'segment/delete',
  async (id: string) => {
    const res = await axios.delete(`${apiUrl}api/segments/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  }
)

export const fetchAsyncGetBrands = createAsyncThunk('brand/get', async () => {
  const res = await axios.get(`${apiUrl}api/brands/`, {
    headers: {
      Authorization: `token ${localStorage.token}`,
    },
  })
  return res.data
})

export const fetchAsyncCreateBrand = createAsyncThunk(
  'brand/post',
  async (brand: Omit<BrandType, 'id'>) => {
    const res = await axios.post(`${apiUrl}api/brands/`, brand, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  }
)

export const fetchAsyncUpdateBrand = createAsyncThunk(
  'brand/put',
  async (brand: BrandType) => {
    const res = await axios.put(`${apiUrl}api/brands/${brand.id}/`, brand, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  }
)
