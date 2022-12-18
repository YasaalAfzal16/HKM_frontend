import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hkm_CRUD_API } from "../services/hkm_CRUD_API";
import isLoggedReducer from "../features/user/isLogged";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, isLoggedReducer);

const store = configureStore({
  reducer: {
    isLogged: persistedReducer,
    [hkm_CRUD_API.reducerPath]: hkm_CRUD_API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      hkm_CRUD_API.middleware
    ),
});
const Persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, Persistor };
