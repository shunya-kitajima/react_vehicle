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

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

const handlers = [
  rest.post('http://localhost:8000/api/profile/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1, username: 'test user' }))
  }),
  rest.get('http://localhost:8000/api/segments/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
  rest.get('http://localhost:8000/api/brands/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
  rest.get('http://localhost:8000/api/vehicles/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
]

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})
