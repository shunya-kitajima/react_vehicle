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
import Brand from '../components/Brand'

const handlers = [
  rest.get('http://localhost:8000/api/brands/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, brand_name: 'Toyota' },
        { id: 2, brand_name: 'Tesla' },
      ])
    )
  }),
  rest.post('http://localhost:8000/api/brands/', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json([{ id: 3, brand_name: 'Audi' }]))
  }),
  rest.put('http://localhost:8000/api/brands/1/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, brand_name: 'new Toyota' }]))
  }),
  rest.put('http://localhost:8000/api/brands/2/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 2, brand_name: 'new Tesla' }]))
  }),
  rest.delete('http://localhost:8000/api/brands/1/', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.delete('http://localhost:8000/api/brands/2/', (req, res, ctx) => {
    return res(ctx.status(200))
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