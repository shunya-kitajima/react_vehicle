import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { EditedVehicleType } from '../../types/types'

const apiUrl = 'http://localhost:8000/'

export const fetchVehicle = () => {
  const fetchAsyncGetVehicles = createAsyncThunk('vehicle/get', async () => {
    const res = await axios.get(`${apiUrl}api/vehicles/`, {
      headers: {
        Authorization: `token ${localStorage.token}`,
      },
    })
    return res.data
  })

  const fetchAsyncCreateVehicle = createAsyncThunk(
    'vehicle/post',
    async (vehicle: Omit<EditedVehicleType, 'id'>) => {
      const res = await axios.post(`${apiUrl}api/vehicles/`, vehicle, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.token}`,
        },
      })
      return res.data
    }
  )

  const fetchAsyncUpdateVehicle = createAsyncThunk(
    'vehicle/put',
    async (vehicle: EditedVehicleType) => {
      const res = await axios.put(
        `${apiUrl}api/vehicles/${vehicle.id}/`,
        vehicle,
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

  const fetchAsyncDeleteVehicle = createAsyncThunk(
    'vehicle/delete',
    async (id: number) => {
      const res = await axios.delete(`${apiUrl}api/vehicles/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.token}`,
        },
      })
      return res.data
    }
  )

  return {
    fetchAsyncGetVehicles,
    fetchAsyncCreateVehicle,
    fetchAsyncUpdateVehicle,
    fetchAsyncDeleteVehicle,
  }
}
