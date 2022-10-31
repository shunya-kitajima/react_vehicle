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
import Brand from '../components/Brand'
import Vehicle from '../components/Vehicle'

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
  rest.get('http://localhost:8000/api/brands/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, brand_name: 'Toyota' },
        { id: 2, brand_name: 'Tesla' },
      ])
    )
  }),
  rest.delete('http://localhost:8000/api/segments/1/', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.delete('http://localhost:8000/api/segments/2/', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.delete('http://localhost:8000/api/brands/1/', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.delete('http://localhost:8000/api/brands/2/', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.get('http://localhost:8000/api/vehicles/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          vehicle_name: 'SQ7',
          release_year: 2019,
          price: 300.12,
          segment: 1,
          brand: 1,
          segment_name: 'K-CAR',
          brand_name: 'Toyota',
        },
        {
          id: 2,
          vehicle_name: 'MODEL S',
          release_year: 2020,
          price: 400.12,
          segment: 2,
          brand: 2,
          segment_name: 'EV',
          brand_name: 'Tesla',
        },
      ])
    )
  }),
  rest.post('http://localhost:8000/api/vehicles/', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 3,
        vehicle_name: 'MODEL X',
        release_year: 2019,
        price: 350.12,
        segment: 2,
        brand: 2,
        segment_name: 'EV',
        brand_name: 'Tesla',
      })
    )
  }),
  rest.put('http://localhost:8000/api/vehicles/1/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        vehicle_name: 'new SQ7',
        release_year: 2010,
        price: 350.12,
        segment: 2,
        brand: 2,
        segment_name: 'EV',
        brand_name: 'Tesla',
      })
    )
  }),
  rest.put('http://localhost:8000/api/vehicles/2/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
        vehicle_name: 'new MODEL S',
        release_year: 2018,
        price: 450.12,
        segment: 1,
        brand: 1,
        segment_name: 'K-CAR',
        brand_name: 'Toyota',
      })
    )
  }),
  rest.delete('http://localhost:8000/api/vehicles/1/', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.delete('http://localhost:8000/api/vehicles/2/', (req, res, ctx) => {
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

describe('Vehicle Component Test Cases', () => {
  let store: Store<any, AnyAction>
  beforeEach(() => {
    store = configureStore({
      reducer: {
        vehicle: vehicleReducer,
      },
    })
  })
  it('1: Should render all the element correctly', async () => {
    render(
      <Provider store={store}>
        <Vehicle />
      </Provider>
    )
    expect(screen.getByTestId('h3-vehicle')).toBeTruthy()
    expect(screen.getByPlaceholderText('new vehicle name')).toBeTruthy()
    expect(screen.getByPlaceholderText('year of release')).toBeTruthy()
    expect(screen.getByPlaceholderText('price')).toBeTruthy()
    expect(screen.getByTestId('select-segment')).toBeTruthy()
    expect(screen.getByTestId('select-brand')).toBeTruthy()
    expect(screen.getByTestId('btn-vehicle-post')).toBeTruthy()
    expect(await screen.findByText('SQ7')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')[0]).toBeTruthy()
    expect(screen.getByTestId('delete-vehicle-1')).toBeTruthy()
    expect(screen.getByTestId('edit-vehicle-1')).toBeTruthy()
    expect(screen.getAllByRole('listitem')[0]).toBeTruthy()
    expect(screen.getByTestId('delete-vehicle-2')).toBeTruthy()
    expect(screen.getByTestId('edit-vehicle-2')).toBeTruthy()
  })
  it('2: Should render list of vehicles from REST API', async () => {
    render(
      <Provider store={store}>
        <Vehicle />
      </Provider>
    )
    expect(screen.queryByText('SQ7')).toBeNull()
    expect(screen.queryByText('MODEL S')).toBeNull()
    expect(await screen.findByText('SQ7')).toBeInTheDocument()
    expect(screen.getByTestId('name-vehicle-1').textContent).toBe('SQ7')
    expect(screen.getByTestId('name-vehicle-2').textContent).toBe('MODEL S')
  })
  it('3: Should not render list of vehicle from REST API when rejected', async () => {
    server.use(
      rest.get('http://localhost:8000/api/vehicles/', (req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    render(
      <Provider store={store}>
        <Vehicle />
      </Provider>
    )
    expect(screen.queryByText('SQ7')).toBeNull()
    expect(screen.queryByText('MODEL S')).toBeNull()
    expect(await screen.findByText('Get error!')).toBeInTheDocument()
    expect(screen.queryByText('SQ7')).toBeNull()
    expect(screen.queryByText('MODEL S')).toBeNull()
  })
  it('4: Should add new vehicle and also to the list', async () => {
    render(
      <Provider store={store}>
        <Segment />
        <Brand />
        <Vehicle />
      </Provider>
    )
    expect(screen.queryByText('MODEL X')).toBeNull()
    expect(await screen.findByText('SQ7')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('btn-vehicle-post'))
    expect(screen.queryByText('MODEL X')).toBeNull()
    const inputNameValue = screen.getByPlaceholderText('new vehicle name')
    await userEvent.type(inputNameValue, 'MODEL X')
    const inputYearValue = screen.getByPlaceholderText('year of release')
    await userEvent.type(inputYearValue, '2019')
    const inputPriceValue = screen.getByPlaceholderText('price')
    await userEvent.type(inputPriceValue, '350.12')
    await userEvent.selectOptions(screen.getByTestId('select-segment'), '2')
    await userEvent.selectOptions(screen.getByTestId('select-brand'), '2')
    await userEvent.click(screen.getByTestId('btn-vehicle-post'))
    expect(await screen.findByText('Created vehicle!')).toBeInTheDocument()
    expect(await screen.findByText('MODEL X')).toBeInTheDocument()
    expect(screen.getByTestId('delete-vehicle-3')).toBeTruthy()
    expect(screen.getByTestId('edit-vehicle-3')).toBeTruthy()
  })
  it('5: Should delete vehicle(id 1) and also from list', async () => {
    render(
      <Provider store={store}>
        <Vehicle />
      </Provider>
    )
    expect(await screen.findByText('SQ7')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('delete-vehicle-1'))
    expect(await screen.findByText('Deleted vehicle!')).toBeInTheDocument()
    expect(screen.queryByText('SQ7')).toBeNull()
  })
})
