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
import vehicleReducer from '../features/vehicleSlice'
import Segment from '../components/Segment'

const handlers = [
  rest.get('http://localhost:8000/api/segments/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, segment_name: 'K-CAR' },
        { id: 2, segment_name: 'EV' },
      ])
    )
  }),
  rest.post('http://localhost:8000/api/segments/', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 3, segment_name: 'Large-SUV' }))
  }),
  rest.put('http://localhost:8000/api/segments/1/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: 1, segment_name: 'new Large-SUV' })
    )
  }),
  rest.put('http://localhost:8000/api/segments/2/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 2, segment_name: 'new EV' }))
  }),
  rest.delete('http://localhost:8000/api/segments/1/', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.delete('http://localhost:8000/api/segments/2/', (req, res, ctx) => {
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

describe('Segment Component Test Cases', () => {
  let store: Store<any, AnyAction>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        vehicle: vehicleReducer,
      },
    })
  })
  it('1: Should render all the elements correctly', async () => {
    render(
      <Provider store={store}>
        <Segment />
      </Provider>
    )
    expect(screen.getByTestId('h3-segment')).toBeTruthy()
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByTestId('btn-segment-post')).toBeTruthy()
    expect(await screen.findAllByText('K-CAR')).toBeTruthy()
    expect(screen.getAllByRole('listitem')[0]).toBeTruthy()
    expect(screen.getByTestId('delete-segment-1')).toBeTruthy()
    expect(screen.getByTestId('edit-segment-1')).toBeTruthy()
    expect(screen.getAllByRole('listitem')[1]).toBeTruthy()
    expect(screen.getByTestId('delete-segment-2')).toBeTruthy()
    expect(screen.getByTestId('edit-segment-2')).toBeTruthy()
  })
})
