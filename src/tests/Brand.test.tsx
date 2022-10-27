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
    return res(ctx.status(201), ctx.json({ id: 3, brand_name: 'Audi' }))
  }),
  rest.put('http://localhost:8000/api/brands/1/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1, brand_name: 'new Toyota' }))
  }),
  rest.put('http://localhost:8000/api/brands/2/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 2, brand_name: 'new Tesla' }))
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

describe('Brand Component Test Cases', () => {
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
        <Brand />
      </Provider>
    )
    expect(screen.getByTestId('h3-brand')).toBeTruthy()
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByTestId('btn-brand-post')).toBeTruthy()
    expect(await screen.findByText('Toyota')).toBeTruthy()
    expect(screen.getAllByRole('listitem')[0]).toBeTruthy()
    expect(screen.getByTestId('delete-brand-1')).toBeTruthy()
    expect(screen.getByTestId('edit-brand-1')).toBeTruthy()
    expect(screen.getAllByRole('listitem')[1]).toBeTruthy()
    expect(screen.getByTestId('delete-brand-2')).toBeTruthy()
    expect(screen.getByTestId('edit-brand-2')).toBeTruthy()
  })
  it('2: Should render list of brands from REST API', async () => {
    render(
      <Provider store={store}>
        <Brand />
      </Provider>
    )
    expect(screen.queryByText('Toyota')).toBeNull()
    expect(screen.queryByText('Tesla')).toBeNull()
    expect(await screen.findByText('Toyota')).toBeTruthy()
    expect(screen.getByTestId('list-brand-1').textContent).toBe('Toyota')
    expect(screen.getByTestId('list-brand-2').textContent).toBe('Tesla')
  })
  it('3: Should not render list of brands from REST API Whe rejected', async () => {
    server.use(
      rest.get('http://localhost:8000/api/brands/', (req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    render(
      <Provider store={store}>
        <Brand />
      </Provider>
    )
    expect(screen.queryByText('Toyota')).toBeNull()
    expect(screen.queryByText('Tesla')).toBeNull()
    expect(await screen.findByText('Get error!')).toBeInTheDocument()
    expect(screen.queryByText('Toyota')).toBeNull()
    expect(screen.queryByText('Tesla')).toBeNull()
  })
  it('4: Should add new brand and also to the list', async () => {
    render(
      <Provider store={store}>
        <Brand />
      </Provider>
    )
    expect(screen.queryByText('Audi')).toBeNull()
    await userEvent.click(screen.getByTestId('btn-brand-post'))
    expect(screen.queryByText('Audi')).toBeNull()
    const inputValue = screen.getByPlaceholderText('new brand name')
    await userEvent.type(inputValue, 'Audi')
    await userEvent.click(screen.getByTestId('btn-brand-post'))
    expect(await screen.findByText('Created brand!')).toBeTruthy()
    expect(await screen.findByText('Audi')).toBeInTheDocument()
    expect(screen.getByTestId('delete-brand-3')).toBeTruthy()
    expect(screen.getByTestId('edit-brand-3')).toBeTruthy()
  })
  it('5: Should delete brand(id 1) and also from list', async () => {
    render(
      <Provider store={store}>
        <Brand />
      </Provider>
    )
    expect(await screen.findByText('Toyota')).toBeTruthy()
    await userEvent.click(screen.getByTestId('delete-brand-1'))
    expect(await screen.findByText('Delete brand!')).toBeTruthy()
    expect(screen.queryByText('Toyota')).toBeNull()
  })
  it('6: Should delete brand(id 2) and also from list', async () => {
    render(
      <Provider store={store}>
        <Brand />
      </Provider>
    )
    expect(await screen.findByText('Tesla')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('delete-brand-2'))
    expect(await screen.findByText('Delete brand!')).toBeTruthy()
    expect(screen.queryByText('Tesla')).toBeNull()
  })
  it('7: Should update brand(id 1) and also from list', async () => {
    render(
      <Provider store={store}>
        <Brand />
      </Provider>
    )
    expect(await screen.findByText('Toyota')).toBeTruthy()
    await userEvent.click(screen.getByTestId('edit-brand-1'))
    const inputValue = screen.getByPlaceholderText('new brand name')
    await userEvent.type(inputValue, 'new Toyota')
    await userEvent.click(screen.getByTestId('btn-brand-post'))
    expect(await screen.findByText('Updated brand!')).toBeTruthy()
    expect(screen.getByTestId('list-brand-1').textContent).toBe('new Toyota')
  })
  it('8: Should update brand(id 2) and also from list', async () => {
    render(
      <Provider store={store}>
        <Brand />
      </Provider>
    )
    expect(await screen.findByText('Tesla')).toBeTruthy()
    await userEvent.click(screen.getByTestId('edit-brand-2'))
    const inputValue = screen.getByPlaceholderText('new brand name')
    await userEvent.type(inputValue, 'new Tesla')
    await userEvent.click(screen.getByTestId('btn-brand-post'))
    expect(await screen.findByText('Updated brand!')).toBeTruthy()
    expect(screen.getByTestId('list-brand-2').textContent).toBe('new Tesla')
  })
})
