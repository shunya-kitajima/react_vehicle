/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fetchAuth } from '../hooks/fetchAuth'
import authReducer from '../features/authSlice'
import Auth from '../components/Auth'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

const handlers = [
  rest.post('http://localhost:8000/api/auth/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: 'abc123' }))
  }),
  rest.post('http://localhost:8000/api/create/', (req, res, ctx) => {
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
