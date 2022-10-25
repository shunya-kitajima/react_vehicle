import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SegmentType } from '../../types/types'

const apiUrl = 'http://localhost:8000/'

export const fetchSegment = () => {
  const fetchAsyncGetSegments = createAsyncThunk('segment/get', async () => {
    const res = await axios.get(`${apiUrl}api/segments/`, {
      headers: {
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  })

  const fetchAsyncCreateSegment = createAsyncThunk(
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

  const fetchAsyncUpdateSegment = createAsyncThunk(
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

  const fetchAsyncDeleteSegment = createAsyncThunk(
    'segment/delete',
    async (id: number) => {
      await axios.delete(`${apiUrl}api/segments/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.token}`,
        },
      })
      return id
    }
  )

  return {
    fetchAsyncGetSegments,
    fetchAsyncCreateSegment,
    fetchAsyncUpdateSegment,
    fetchAsyncDeleteSegment,
  }
}
