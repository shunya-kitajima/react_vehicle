import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Auth from './components/Auth'
import MainPage from './components/MainPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.app__root}></div>
    </BrowserRouter>
  )
}

export default App
