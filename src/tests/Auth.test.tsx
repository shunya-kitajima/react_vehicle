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
