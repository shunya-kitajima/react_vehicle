import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BrandType } from '../../types/types'

const apiUrl = 'http://localhost:8000/'

export const fetchBrand = () => {
  const fetchAsyncGetBrands = createAsyncThunk('brand/get', async () => {
    const res = await axios.get(`${apiUrl}api/brands/`, {
      headers: {
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  })

  const fetchAsyncCreateBrand = createAsyncThunk(
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

  const fetchAsyncUpdateBrand = createAsyncThunk(
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

  const fetchAsyncDeleteBrand = createAsyncThunk(
    'brand/delete',
    async (id: string) => {
      const res = await axios.delete(`${apiUrl}api/brands/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.token}`,
        },
      })
      return res.data
    }
  )

  return {
    fetchAsyncGetBrands,
    fetchAsyncCreateBrand,
    fetchAsyncUpdateBrand,
    fetchAsyncDeleteBrand,
  }
}
