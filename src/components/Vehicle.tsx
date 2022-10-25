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

  const createUpdateVehicle = async () => {
    if (editedVehicle.id === 0) {
      const result = await dispatch(fetchAsyncCreateVehicle(editedVehicle))
      dispatch(
        editVehicle({
          id: 0,
          vehicle_name: '',
          release_year: 2020,
          price: 0.0,
          segment: 0,
          brand: 0,
        })
      )
      if (fetchAsyncCreateVehicle.fulfilled.match(result))
        setSuccessMsg('Created vehicle!')
    } else {
      const result = await dispatch(fetchAsyncUpdateVehicle(editedVehicle))
      dispatch(
        editVehicle({
          id: 0,
          vehicle_name: '',
          release_year: 2020,
          price: 0.0,
          segment: 0,
          brand: 0,
        })
      )
      if (fetchAsyncUpdateVehicle.fulfilled.match(result))
        setSuccessMsg('Updated vehicle!')
    }
  }

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
      <select
        data-testid="select-segment"
        value={editedVehicle.segment}
        onChange={(e) =>
          dispatch(editVehicle({ ...editedVehicle, segment: e.target.value }))
        }
      >
        <option value={0}>Segment</option>
        {segmentOptions}
      </select>
      <select
        data-testid="select-brand"
        value={editedVehicle.brand}
        onChange={(e) =>
          dispatch(editVehicle({ ...editedVehicle, brand: e.target.value }))
        }
      >
        <option value={0}>Brand</option>
        {brandOptions}
      </select>
      <button
        data-testid="btn-vehicle-post"
        disabled={
          !editedVehicle.vehicle_name ||
          !editedVehicle.segment ||
          !editedVehicle.brand
        }
        onClick={createUpdateVehicle}
      >
        {editedVehicle.id === 0 ? 'Create' : 'Update'}
      </button>
      <ul>
        {vehicles?.map((vehicle) => (
          <li className={styles.vehicle__item} key={vehicle.id}>
            <span data-testid={`list-vehicle-${vehicle.id}`}>
              <strong data-testid={`name-vehicle-${vehicle.id}`}>
                {vehicle.vehicle_name}
              </strong>
              --{vehicle.release_year}--- ¥{vehicle.price} [M] ---
              {vehicle.segment_name} {vehicle.brand_name}---
            </span>
            <div>
              <button
                data-testid={`delete-vehicle-${vehicle.id}`}
                onClick={async () => {
                  const result = await dispatch(
                    fetchAsyncDeleteVehicle(vehicle.id)
                  )
                  if (fetchAsyncDeleteVehicle.fulfilled.match(result))
                    setSuccessMsg('Deleted vehicle!')
                }}
              >
                delete
              </button>
              <button
                data-testid={`edit-vehicle-${vehicle.id}`}
                onClick={() => {
                  dispatch(editVehicle(vehicle))
                }}
              >
                edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Vehicle
