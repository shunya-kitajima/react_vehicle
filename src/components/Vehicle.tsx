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

  const segmentOptions = segments?.map((segment) => (
    <option key={segment.id} value={segment.id}>
      {segment.segment_name}
    </option>
  ))
  const brandOptions = brands?.map((brand) => (
    <option key={brand.id} value={brand.id}>
      {brand.brand_name}
    </option>
  ))

  useEffect(() => {
    const fetchBootLoader = async () => {
      const result = await dispatch(fetchAsyncGetVehicles())
      if (fetchAsyncGetVehicles.rejected.match(result))
        setSuccessMsg('Get error!')
    }
    fetchBootLoader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>Vehicle</div>
}

export default Vehicle
