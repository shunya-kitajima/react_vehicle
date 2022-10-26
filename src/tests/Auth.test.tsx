/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Provider } from 'react-redux'
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit'
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
    return res(ctx.status(201))
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

describe('Auth Component Test Cases', () => {
  let store: Store<any, AnyAction>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    })
  })
  it('1: Should render all the elements correctly', async () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    expect(screen.getByTestId('label-username')).toBeTruthy()
    expect(screen.getByTestId('label-password')).toBeTruthy()
    expect(screen.getByTestId('input-username')).toBeTruthy()
    expect(screen.getByTestId('input-password')).toBeTruthy()
    expect(screen.getByRole('button')).toBeTruthy()
    expect(screen.getByTestId('toggle-icon')).toBeTruthy()
  })
  it('2: Should change button name by icon click', async () => {
    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    )
    expect(screen.getByRole('button')).toHaveTextContent('Login')
    await userEvent.click(screen.getByTestId('toggle-icon'))
    expect(screen.getByRole('button')).toHaveTextContent('Register')
  })
})
