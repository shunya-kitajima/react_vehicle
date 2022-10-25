import React from 'react'
import { useNavigate } from 'react-router-dom'

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
