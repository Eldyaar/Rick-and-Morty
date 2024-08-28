import { configureStore } from "@reduxjs/toolkit"

import { heroReducer } from "./heroSlice"


export const store = configureStore({
   reducer: {
      heroes: heroReducer
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch