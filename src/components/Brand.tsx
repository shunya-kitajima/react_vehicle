import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import styles from './Brand.module.css'
import { fetchBrand } from '../hooks/fetchBrand'
import {
  editBrand,
  selectBrands,
  selectEditedBrand,
} from '../features/vehicleSlice'

const Brand: React.FC = () => {
  return <div>Brand</div>
}

export default Brand
