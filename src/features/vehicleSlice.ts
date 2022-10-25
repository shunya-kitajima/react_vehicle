import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import {
  SegmentType,
  BrandType,
  VehicleType,
  EditedVehicleType,
} from '../../types/types'

export interface VehicleState {
  segments: SegmentType[]
  brands: BrandType[]
  vehicles: VehicleType[]
  editedSegment: SegmentType
  editedBrand: BrandType
  editedVehicle: EditedVehicleType
}

const initialState: VehicleState = {
  segments: [
    {
      id: 0,
      segment_name: '',
    },
  ],
  brands: [
    {
      id: 0,
      brand_name: '',
    },
  ],
  vehicles: [
    {
      id: 0,
      vehicle_name: '',
      release_year: 2020,
      price: 0.0,
      segment: 0,
      brand: 0,
      segment_name: '',
      brand_name: '',
    },
  ],
  editedSegment: {
    id: 0,
    segment_name: '',
  },
  editedBrand: {
    id: 0,
    brand_name: '',
  },
  editedVehicle: {
    id: 0,
    vehicle_name: '',
    release_year: 2020,
    price: 0.0,
    segment: 0,
    brand: 0,
  },
}

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    editSegment: (state, action) => {
      state.editedSegment = action.payload
    },
    editBrand: (state, action) => {
      state.editedBrand = action.payload
    },
    editVehicle: (state, action) => {
      state.editedVehicle = action.payload
    },
  },
})
