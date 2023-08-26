// import { configureStore } from "@reduxjs/toolkit"
// import { movieSliceApi } from "@Features/movies/movies-api-slice"
// import { carSliceApi } from "@Features/cars/car-api-slice"
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// export const store = configureStore({
//   reducer: {
//     [movieSliceApi.reducerPath]: movieSliceApi.reducer,
//     [carSliceApi.reducerPath]: carSliceApi.reducer,
//   },
//   middleware: (getDefaultMiddle) => {
//     return getDefaultMiddle().concat(
//       movieSliceApi.middleware,
//       carSliceApi.middleware
//     )
//   },
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export const useTypedDispatch = () => useDispatch<AppDispatch>()
// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
