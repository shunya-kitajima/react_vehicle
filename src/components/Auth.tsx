import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { FlipCameraAndroid } from '@material-ui/icons'
import styles from './Auth.module.css'
import { fetchAuth } from '../hooks/fetchAuth'

const Auth: React.FC = () => {
  return <div>Welcome to Auth</div>
}

export default Auth
