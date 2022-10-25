import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import styles from './MainPage.module.css'
import { fetchAuth } from '../hooks/fetchAuth'
import { selectProfile } from '../features/authSlice'
import Segment from './Segment'
import Brand from './Brand'
import Vehicle from './Vehicle'

const MainPage: React.FC = () => {
  const navigate = useNavigate()
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  const { fetchAsyncGetProfile } = fetchAuth()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetProfile())
    }
    fetchBootLoader()
  }, [dispatch, fetchAsyncGetProfile])

  return (
    <div className={styles.mainPage__root}>
      <Grid container>
        <Grid item xs>
          {profile.username}
        </Grid>
        <Grid item xs>
          <span data-testid="span-title" className={styles.mainPage__title}>
            Vehicle register system
          </span>
        </Grid>
        <Grid item xs>
          <button data-testid="btn-logout" onClick={logout}>
            Logout
          </button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <Segment />
        </Grid>
        <Grid item xs={3}>
          <Brand />
        </Grid>
        <Grid item xs={6}>
          <Vehicle />
        </Grid>
      </Grid>
    </div>
  )
}

export default MainPage
