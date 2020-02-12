import React from 'react'
import { render } from '@testing-library/react'
import HApp from './HApp'

test('renders learn react link', () => {
  const { getByText } = render(<HApp />)
  const divElement = getByText(/Note hApp/i)
  expect(divElement).toBeInTheDocument()
})
