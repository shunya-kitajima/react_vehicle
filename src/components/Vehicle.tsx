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
  return <div>Vehicle</div>
}

export default Vehicle
