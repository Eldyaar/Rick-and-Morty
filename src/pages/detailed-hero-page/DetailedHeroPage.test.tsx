import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import { thunk } from 'redux-thunk'
import { configureStore } from 'redux-mock-store'
import {jest} from '@jest/globals'
import { RootState } from '../../store'
import { getDetailHero } from '../../store/heroSlice'

import DetailedHeroPage from './DetailedHeroPage'


const middlewares = [thunk]
const mockStore = configureStore(middlewares)


describe('DetailedHeroPage', () => {
   let store: ReturnType<typeof mockStore>;

   beforeEach(() => {
      store = mockStore({
         heroes: {
            selectedHero: {
               id: 1,
               name: 'Rick Sanchez',
               species: 'Human',
               status: 'Alive',
               location: { name: 'Earth', url: '' },
               image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
               url: '',
               episode: [],
               created: '',
               type: '',
               gender: 'Male',
               origin: { name: 'unknown', url: '' },
            },
            heroLoading: false,
            heroError: null,
         } as RootState['heroes'],
      });
   });

   it('renders hero details when data is available', async () => {
      render(
         <Provider store={store}>
            <MemoryRouter initialEntries={['/hero/1']}>
               <Route path="/hero/:heroId">
                  <DetailedHeroPage />
               </Route>
            </MemoryRouter>
         </Provider>
      );

      await waitFor(() => {
         expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
         expect(screen.getByText('Human')).toBeInTheDocument();
         expect(screen.getByText('Alive')).toBeInTheDocument();
         expect(screen.getByText('Gender:')).toBeInTheDocument();
         expect(screen.getByText('Type:')).toBeInTheDocument();
         expect(screen.getByText('Origin:')).toBeInTheDocument();
         expect(screen.getByText('Location:')).toBeInTheDocument();
      });
   });

   it('displays loading spinner when data is loading', () => {
      store = mockStore({
         heroes: {
            ...store.getState().heroes,
            heroLoading: true,
         },
      });

      render(
         <Provider store={store}>
            <MemoryRouter initialEntries={['/hero/1']}>
               <Route path="/hero/:heroId">
                  <DetailedHeroPage />
               </Route>
            </MemoryRouter>
         </Provider>
      );

      expect(screen.getByRole('spinner')).toBeInTheDocument();
   });
});


