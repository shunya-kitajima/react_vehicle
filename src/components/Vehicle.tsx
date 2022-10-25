import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import styles from './Vehicle.module.css'
import { fetchVehicle } from '../hooks/fetchVehicle'
import {
  editVehicle,
  selectVehicles,
  selectEditedVehicle,
  selectSegments,
  selectBrands,
} from '../features/vehicleSlice'

const Vehicle: React.FC = () => {
  const dispatch = useAppDispatch()
  const segments = useAppSelector(selectSegments)
  const brands = useAppSelector(selectBrands)
  const vehicles = useAppSelector(selectVehicles)
  const editedVehicle = useAppSelector(selectEditedVehicle)
  const [successMsg, setSuccessMsg] = useState('')
  const {
    fetchAsyncGetVehicles,
    fetchAsyncCreateVehicle,
    fetchAsyncUpdateVehicle,
    fetchAsyncDeleteVehicle,
  } = fetchVehicle()

  return <div>Vehicle</div>
}

export default Vehicle
