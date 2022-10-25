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
  const dispatch = useAppDispatch()
  const brands = useAppSelector(selectBrands)
  const editedBrand = useAppSelector(selectEditedBrand)
  const [successMsg, setSuccessMsg] = useState('')
  const {
    fetchAsyncGetBrands,
    fetchAsyncCreateBrand,
    fetchAsyncUpdateBrand,
    fetchAsyncDeleteBrand,
  } = fetchBrand()

  const createUpdateBrand = async () => {
    if (editedBrand.id === 0) {
      const result = await dispatch(
        fetchAsyncCreateBrand({ brand_name: editedBrand.brand_name })
      )
      dispatch(editBrand({ id: 0, brand_name: '' }))
      if (fetchAsyncCreateBrand.fulfilled.match(result))
        setSuccessMsg('Created brand!')
    } else {
      const result = await dispatch(fetchAsyncUpdateBrand(editedBrand))
      dispatch(editBrand({ id: 0, brand_name: '' }))
      if (fetchAsyncUpdateBrand.fulfilled.match(result))
        setSuccessMsg('Updated brand!')
    }
  }

  return <div>Brand</div>
}

export default Brand
