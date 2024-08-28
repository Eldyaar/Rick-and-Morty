import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { IHeroState, IHero } from "../models/models"


export const getHeroes = createAsyncThunk(
   'heroes/getHeroes',
   async ({ page, status, name }: { page: number, status: string, name: string }) => {
      const response = await axios.get(`https://rickandmortyapi.com/api/character`, {
         params: {
            page,
            status,
            name
         }
      })
      return response.data
   }
)

export const getDetailHero = createAsyncThunk('heroes/getDetailHero', async (id: number) => {
   const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
   return response.data
})


const initialState: IHeroState = {
   data: {
      results: [],
      info: {
         count: 0,
         pages: 0,
         next: null,
         prev: null
      }
   },
   isLoading: false,
   error: null,
   currentPage: 1,
   totalPages: 0,
   totalItems: 0,
   filters: {
      status: '',
      name: ''
   },
   selectedHero: null,
   heroError: null,
   heroLoading: false
}

const heroSlice = createSlice({
   name: 'heroes',
   initialState,
   reducers: {
      setPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
      setStatusFilter(state, action: PayloadAction<string>) {
         state.filters.status = action.payload
      },
      setNameFilter(state, action: PayloadAction<string>) {
         state.filters.name = action.payload
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getHeroes.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getHeroes.fulfilled, (state, action) => {
            state.error = null
            state.isLoading = false
            state.data = action.payload
            state.totalPages = action.payload.info.pages
            state.totalItems = action.payload.info.count
         })
         .addCase(getHeroes.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Unknown error'
         })
         .addCase(getDetailHero.pending, (state) => {
            state.heroLoading = true
            state.heroError = null
         })
         .addCase(getDetailHero.fulfilled, (state, action: PayloadAction<IHero>) => {
            state.selectedHero = action.payload
            state.heroLoading = false
         })
         .addCase(getDetailHero.rejected, (state, action) => {
            state.heroLoading = false
            state.heroError = action.error.message || 'Unknown error'
         })
   }
})

export const { setPage, setStatusFilter, setNameFilter } = heroSlice.actions
export const heroReducer = heroSlice.reducer