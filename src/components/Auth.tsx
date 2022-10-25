import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { FlipCameraAndroid } from '@material-ui/icons'
import styles from './Auth.module.css'
import { fetchAuth } from '../hooks/fetchAuth'

const Auth: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [successMsg, setSuccessMsg] = useState('')
  const { fetchAsyncLogin, fetchAsyncRegister } = fetchAuth()

  const login = async () => {
    const result = await dispatch(
      fetchAsyncLogin({ username: username, password: password })
    )
    if (fetchAsyncLogin.fulfilled.match(result)) {
      setSuccessMsg('Successfully logged in!')
      navigate('/vehicle')
    } else {
      setSuccessMsg('Login error!')
    }
  }
  const register = async () => {
    const result = await dispatch(
      fetchAsyncRegister({ username: username, password: password })
    )
    if (fetchAsyncRegister.fulfilled.match(result)) {
      login()
    } else {
      setSuccessMsg('Registration error!')
    }
  }
  const authUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      login()
    } else {
      register()
    }
  }

  return <div>Welcome to Auth</div>
}

export default Auth
