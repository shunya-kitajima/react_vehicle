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
    return res(ctx.status(200), ctx.json({ id: 1, segment_name: 'new K-CAR' }))
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
  it('2: Should render list of segments from REST API', async () => {
    render(
      <Provider store={store}>
        <Segment />
      </Provider>
    )
    expect(screen.queryByText('K-CAR')).toBeNull()
    expect(screen.queryByText('EV')).toBeNull()
    expect(await screen.findByText('K-CAR')).toBeInTheDocument()
    expect(screen.getByTestId('list-segment-1').textContent).toBe('K-CAR')
    expect(screen.getByTestId('list-segment-2').textContent).toBe('EV')
  })
  it('3: Should not render list of segment from REST API', async () => {
    server.use(
      rest.get('http://localhost:8000/api/segments/', (req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    render(
      <Provider store={store}>
        <Segment />
      </Provider>
    )
    expect(screen.queryByText('K-CAR')).toBeNull()
    expect(screen.queryByText('EV')).toBeNull()
    expect(await screen.findByText('Get error!')).toBeInTheDocument()
    expect(screen.queryByText('K-CAR')).toBeNull()
    expect(screen.queryByText('EV')).toBeNull()
  })
  it('4: Should add new segment and also to the list', async () => {
    render(
      <Provider store={store}>
        <Segment />
      </Provider>
    )
    expect(screen.queryByText('Large-SUV')).toBeNull()
    await userEvent.click(screen.getByTestId('btn-segment-post'))
    expect(screen.queryByText('Large-SUV')).toBeNull()
    const inputValue = screen.getByPlaceholderText('new segment name')
    await userEvent.type(inputValue, 'Large-SUV')
    await userEvent.click(screen.getByTestId('btn-segment-post'))
    expect(await screen.findByText('Created segment!')).toBeInTheDocument()
    expect(await screen.findByText('Large-SUV')).toBeInTheDocument()
    expect(screen.getByTestId('delete-segment-3')).toBeTruthy()
    expect(screen.getByTestId('edit-segment-3')).toBeTruthy()
  })
  it('5: Should delete segment(id 1) and also from list', async () => {
    render(
      <Provider store={store}>
        <Segment />
      </Provider>
    )
    expect(await screen.findByText('K-CAR')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('delete-segment-1'))
    expect(await screen.findByText('Deleted segment!')).toBeInTheDocument()
    expect(screen.queryByText('K-CAR')).toBeNull()
  })
  it('6: Should delete segment(id 2) and also from list', async () => {
    render(
      <Provider store={store}>
        <Segment />
      </Provider>
    )
    expect(await screen.findByText('EV')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('delete-segment-2'))
    expect(await screen.findByText('Deleted segment!')).toBeInTheDocument()
    expect(screen.queryByText('EV')).toBeNull()
  })
})
