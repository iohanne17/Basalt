import {configureStore} from '@reduxjs/toolkit';
import {stockListSliceApi} from '@Features/stockList/stockList-api-slice';
import {stockListDetailSliceApi} from '@Features/stockDetail/stockDetail-api-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    [stockListSliceApi.reducerPath]: stockListSliceApi.reducer,
    [stockListDetailSliceApi.reducerPath]: stockListDetailSliceApi.reducer,
  },
  middleware: getDefaultMiddle => {
    return getDefaultMiddle().concat(
      stockListSliceApi.middleware,
      stockListDetailSliceApi.middleware,
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
