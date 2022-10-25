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

  useEffect(() => {
    const fetchBootLoader = async () => {
      const result = await dispatch(fetchAsyncGetBrands())
      if (fetchAsyncGetBrands.rejected.match(result))
        setSuccessMsg('Get error!')
    }
    fetchBootLoader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h3 data-testid="h3-brand">Brand</h3>
      <span className={styles.brand__status}>{successMsg}</span>
      <div>
        <input
          type="text"
          placeholder="new brand name"
          value={editedBrand.brand_name}
          onChange={(e) =>
            dispatch(editBrand({ ...editedBrand, brand_name: e.target.value }))
          }
        />
        <button
          data-testid="btn-post"
          disabled={!editedBrand.brand_name}
          onClick={createUpdateBrand}
        >
          {editedBrand.id === 0 ? 'Create' : 'Update'}
        </button>
        <ul>
          {brands.map((brand) => (
            <li className={styles.brand__item} key={brand.id}>
              <span data-testid={`list-${brand.id}`}>{brand.brand_name}</span>
              <div>
                <button
                  data-testid={`delete-brand-${brand.id}`}
                  onClick={async () => {
                    const result = await dispatch(
                      fetchAsyncDeleteBrand(brand.id)
                    )
                    if (fetchAsyncDeleteBrand.fulfilled.match(result))
                      setSuccessMsg('Delete brand!')
                  }}
                >
                  delete
                </button>
                <button
                  data-testid={`edit-brand-${brand.id}`}
                  onClick={() => {
                    dispatch(editBrand(brand))
                  }}
                >
                  edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Brand
