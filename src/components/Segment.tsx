import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import styles from './Segment.module.css'
import { fetchSegment } from '../hooks/fetchSegment'
import {
  editSegment,
  selectSegments,
  selectEditedSegment,
} from '../features/vehicleSlice'

const Segment: React.FC = () => {
  const dispatch = useAppDispatch()
  const segments = useAppSelector(selectSegments)
  const editedSegment = useAppSelector(selectEditedSegment)
  const [successMsg, setSuccessMsg] = useState('')
  const {
    fetchAsyncGetSegments,
    fetchAsyncCreateSegment,
    fetchAsyncUpdateSegment,
    fetchAsyncDeleteSegment,
  } = fetchSegment()

  const createUpdateSegment = async () => {
    if (editedSegment.id === 0) {
      const result = await dispatch(
        fetchAsyncCreateSegment({ segment_name: editedSegment.segment_name })
      )
      dispatch(editSegment({ id: 0, segment_name: '' }))
      if (fetchAsyncCreateSegment.fulfilled.match(result))
        setSuccessMsg('Created segment!')
    } else {
      const result = await dispatch(fetchAsyncUpdateSegment(editedSegment))
      dispatch(editSegment({ id: 0, segment_name: '' }))
      if (fetchAsyncUpdateSegment.fulfilled.match(result))
        setSuccessMsg('Updated segment!')
    }
  }

  useEffect(() => {
    const fetchBootLoader = async () => {
      const result = await dispatch(fetchAsyncGetSegments())
      if (fetchAsyncGetSegments.rejected.match(result))
        setSuccessMsg('Get error!')
    }
    fetchBootLoader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h3 data-testid="h3-segment">Segment</h3>
      <span className={styles.segment__status}>{successMsg}</span>
      <div>
        <input
          type="text"
          placeholder="new segment name"
          value={editedSegment.segment_name}
          onChange={(e) =>
            dispatch(
              editSegment({ ...editedSegment, segment_name: e.target.value })
            )
          }
        />
        <button
          data-testid="btn-post"
          disabled={!editedSegment.segment_name}
          onClick={createUpdateSegment}
        >
          {editedSegment.id === 0 ? 'Create' : 'Update'}
        </button>
        <ul>
          {segments.map((segment) => (
            <li className={styles.segment__item} key={segment.id}>
              <span data-testid={`list-${segment.id}`}>
                {segment.segment_name}
              </span>
              <div>
                <button
                  data-testid={`delete-segment-${segment.id}`}
                  onClick={async () => {
                    const result = await dispatch(
                      fetchAsyncDeleteSegment(String(segment.id))
                    )
                    if (fetchAsyncDeleteSegment.fulfilled.match(result))
                      setSuccessMsg('Deleted segment!')
                  }}
                >
                  delete
                </button>
                <button
                  data-testid={`edit-segment-${segment.id}`}
                  onClick={() => {
                    dispatch(editSegment(segment))
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

export default Segment
