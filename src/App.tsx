import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Auth from './components/Auth'
import MainPage from './components/MainPage'

const App: React.FC = () => {
  return (
    <div className={styles.app__root}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/vehicle" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
