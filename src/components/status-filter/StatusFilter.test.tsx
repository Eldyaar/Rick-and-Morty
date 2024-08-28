/* eslint-env jest */
import React from "react"
import { render, screen, fireEvent } from '@testing-library/react'

import StatusFilter from './StatusFilter'


describe('StatusFilter', () => {
  it('renders the status filter with options', () => {
    const handleStatusChange = jest.fn()
    render(<StatusFilter status="" handleStatusChange={handleStatusChange} />)

    expect(screen.getByText('Filter by Status')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Dead')).toBeInTheDocument()
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('calls handleStatusChange when an option is selected', () => {
    const handleStatusChange = jest.fn()
    render(<StatusFilter status="" handleStatusChange={handleStatusChange} />)

    fireEvent.change(screen.getByPlaceholderText('Filter by Status'), { target: { value: 'alive' } })

    expect(handleStatusChange).toHaveBeenCalledWith('alive')
  })
})