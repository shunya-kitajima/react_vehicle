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

  return (
    <>
      <h3 data-testid="h3-vehicle">Vehicle</h3>
      <span className={styles.vehicle__status}>{successMsg}</span>
      <div className={styles.vehicle__input}>
        <input
          type="text"
          placeholder="new vehicle name"
          value={editedVehicle.vehicle_name}
          onChange={(e) =>
            dispatch(
              editVehicle({ ...editedVehicle, vehicle_name: e.target.value })
            )
          }
        />
        <input
          type="number"
          placeholder="year of release"
          min="0"
          value={editedVehicle.release_year}
          onChange={(e) =>
            dispatch(
              editVehicle({ ...editedVehicle, release_year: e.target.value })
            )
          }
        />
        <input
          type="number"
          placeholder="price"
          min="0"
          step="0.01"
          value={editedVehicle.price}
          onChange={(e) =>
            dispatch(editVehicle({ ...editedVehicle, price: e.target.value }))
          }
        />
      </div>
    </>
  )
}

export default Vehicle
