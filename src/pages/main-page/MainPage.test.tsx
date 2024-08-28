import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { RootState } from '../../store'

import MainPage from './MainPage'


const mockStore = configureStore([])

describe('MainPage', () => {
   let store: ReturnType<typeof mockStore>;
 
   beforeEach(() => {
      const initialState: RootState = {
         heroes: {
            data: {
               results: [
                  {
                     id: 1,
                     name: 'Rick Sanchez',
                     species: 'Human',
                     status: 'Alive',
                     location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/3' },
                     image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
                     url: 'https://rickandmortyapi.com/api/character/2',
                     episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
                     created: '2017-11-04T18:50:21.651Z',
                     type: '',
                     gender: 'Male',
                     origin: {
                        name: 'unknown',
                        url: ''
                     },
                  },
                  {
                     id: 2,
                     name: 'Morty Smith',
                     species: 'Human',
                     status: 'Alive',
                     location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/3' },
                     image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
                     url: 'https://rickandmortyapi.com/api/character/2',
                     episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
                     created: '2017-11-04T18:50:21.651Z',
                     type: '',
                     gender: 'Male',
                     origin: {
                        name: 'unknown',
                        url: ''
                     },
                  },
               ],
               info: { count: 2, pages: 1, next: null, prev: null },
            },
            isLoading: false,
            error: null,
            currentPage: 1,
            totalPages: 1,
            totalItems: 2,
            filters: { status: '', name: '' },
            selectedHero: undefined,
            heroLoading: false,
            heroError: ''
         },
      }
      store = mockStore(initialState)
   })
 
   it('renders the hero list', () => {
      render(
         <Provider store={store}>
            <MainPage />
         </Provider>
      )
   
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
      expect(screen.getByText('Morty Smith')).toBeInTheDocument()
   })
 
   it('shows loading spinner when loading', () => {
      store = mockStore({
         heroes: {
            ...store.getState().heroes,
            isLoading: true,
         }
      })
   
      render(
         <Provider store={store}>
            <MainPage />
         </Provider>
      )
   
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
   })
 
   it('shows error message on error', () => {
      store = mockStore({
         heroes: {
            ...store.getState().heroes,
            error: 'Failed to load heroes',
         }
      })
   
      render(
         <Provider store={store}>
            <MainPage />
         </Provider>
      )
   
      expect(screen.getByText('Failed to load heroes')).toBeInTheDocument()
   })
 
   it('calls pagination change function', () => {
      render(
         <Provider store={store}>
            <MainPage />
         </Provider>
      )
   
      const pagination = screen.getByRole('list')
      fireEvent.click(pagination)
   
      // Проверка на вызов функции смены страницы
      const actions = store.getActions()
      expect(actions).toContainEqual({ type: 'heroes/setPage', payload: 1 })
   })
})