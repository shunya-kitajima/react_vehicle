/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import authReducer from '../features/authSlice'
import vehicleReducer from '../features/vehicleSlice'
import MainPage from '../components/MainPage'
import Auth from '../components/Auth'
