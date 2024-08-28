import { render, screen, fireEvent } from '@testing-library/react'

import NameSearch from './NameSearch'


describe('NameSearch Component', () => {
   it('renders with the correct name value', () => {
     const mockHandleNameSearch = jest.fn()
     const name = 'HeroName'
 
     render(<NameSearch name={name} handleNameSearch={mockHandleNameSearch} />)
 
     const inputElement = screen.getByPlaceholderText('Search by Name')
     expect(inputElement).toBeTruthy()
     expect(inputElement).toHaveValue(name)
   })
 
   it('calls handleNameSearch on input change', () => {
     const mockHandleNameSearch = jest.fn()
     const name = ''
 
     render(<NameSearch name={name} handleNameSearch={mockHandleNameSearch} />)
 
     const inputElement = screen.getByPlaceholderText('Search by Name')
     fireEvent.change(inputElement, { target: { value: 'New Hero' } })
 
     expect(mockHandleNameSearch).toHaveBeenCalledWith('New Hero')
   })
})