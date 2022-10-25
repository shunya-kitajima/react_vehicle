import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { fetchSegment } from '../hooks/fetchSegment'
import { fetchBrand } from '../hooks/fetchBrand'
import { fetchVehicle } from '../hooks/fetchVehicle'
import {
  SegmentType,
  BrandType,
  VehicleType,
  EditedVehicleType,
} from '../../types/types'

const {
  fetchAsyncGetSegments,
  fetchAsyncCreateSegment,
  fetchAsyncUpdateSegment,
  fetchAsyncDeleteSegment,
} = fetchSegment()

const {
  fetchAsyncGetBrands,
  fetchAsyncCreateBrand,
  fetchAsyncUpdateBrand,
  fetchAsyncDeleteBrand,
} = fetchBrand()

const {
  fetchAsyncGetVehicles,
  fetchAsyncCreateVehicle,
  fetchAsyncUpdateVehicle,
  fetchAsyncDeleteVehicle,
} = fetchVehicle()

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
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetSegments.fulfilled, (state, action) => {
      return {
        ...state,
        segments: action.payload,
      }
    })
    builder.addCase(fetchAsyncCreateSegment.fulfilled, (state, action) => {
      return {
        ...state,
        segments: [...state.segments, action.payload],
      }
    })
    builder.addCase(fetchAsyncUpdateSegment.fulfilled, (state, action) => {
      return {
        ...state,
        segments: state.segments.map((segment) =>
          segment.id === action.payload.id ? action.payload : segment
        ),
      }
    })
    builder.addCase(fetchAsyncDeleteSegment.fulfilled, (state, action) => {
      return {
        ...state,
        segments: state.segments.filter(
          (segment) => segment.id !== action.payload
        ),
        vehicles: state.vehicles.filter(
          (vehicle) => vehicle.segment !== action.payload
        ),
      }
    })

    builder.addCase(fetchAsyncGetBrands.fulfilled, (state, action) => {
      return {
        ...state,
        brands: action.payload,
      }
    })
    builder.addCase(fetchAsyncCreateBrand.fulfilled, (state, action) => {
      return {
        ...state,
        brands: [...state.brands, action.payload],
      }
    })
    builder.addCase(fetchAsyncUpdateBrand.fulfilled, (state, action) => {
      return {
        ...state,
        brands: state.brands.map((brand) =>
          brand.id === action.payload.id ? action.payload : brand
        ),
      }
    })
    builder.addCase(fetchAsyncDeleteBrand.fulfilled, (state, action) => {
      return {
        ...state,
        brands: state.brands.filter((brand) => brand.id !== action.payload),
        vehicles: state.vehicles.filter(
          (vehicle) => vehicle.brand !== action.payload
        ),
      }
    })

    builder.addCase(fetchAsyncGetVehicles.fulfilled, (state, action) => {
      return {
        ...state,
        vehicles: action.payload,
      }
    })
    builder.addCase(fetchAsyncCreateVehicle.fulfilled, (state, action) => {
      return {
        ...state,
        vehicles: [...state.vehicles, action.payload],
      }
    })
    builder.addCase(fetchAsyncUpdateVehicle.fulfilled, (state, action) => {
      return {
        ...state,
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === action.payload.id ? action.payload : vehicle
        ),
      }
    })
    builder.addCase(fetchAsyncDeleteVehicle.fulfilled, (state, action) => {
      return {
        ...state,
        vehicles: state.vehicles.filter(
          (vehicle) => vehicle.id !== action.payload
        ),
      }
    })
  },
})

export const { editSegment, editBrand, editVehicle } = vehicleSlice.actions

export const selectSegments = (state: RootState) => state.vehicle.segments
export const selectEditedSegment = (state: RootState) =>
  state.vehicle.editedSegment
export const selectBrands = (state: RootState) => state.vehicle.brands
export const selectEditedBrand = (state: RootState) => state.vehicle.editedBrand
export const selectVehicles = (state: RootState) => state.vehicle.vehicles
export const selectEditedVehicle = (state: RootState) =>
  state.vehicle.editedVehicle

export default vehicleSlice.reducer
