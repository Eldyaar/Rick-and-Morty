/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react'

import StatusFilter from './StatusFilter'


describe('StatusFilter', () => {
  it('renders the status filter with options', () => {
    const handleStatusChange = jest.fn()
    render(<StatusFilter status="" handleStatusChange={handleStatusChange} />)

    expect(screen.getByText('Filter by Status')).toBeTruthy()
    expect(screen.getByText('All')).toBeTruthy()
    expect(screen.getByText('Alive')).toBeTruthy()
    expect(screen.getByText('Dead')).toBeTruthy()
    expect(screen.getByText('Unknown')).toBeTruthy()
  })

  it('calls handleStatusChange when an option is selected', () => {
    const handleStatusChange = jest.fn()
    render(<StatusFilter status="" handleStatusChange={handleStatusChange} />)

    fireEvent.change(screen.getByPlaceholderText('Filter by Status'), { target: { value: 'alive' } })

    expect(handleStatusChange).toHaveBeenCalledWith('alive')
  })
})