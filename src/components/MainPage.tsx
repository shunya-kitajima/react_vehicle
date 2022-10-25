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

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
      <button data-testid="btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default MainPage
