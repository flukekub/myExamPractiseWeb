import { configureStore , combineReducers} from "@reduxjs/toolkit";
import scoreSlice  from "./features/scoreSlice";
import stopwatchReducer from "./features/stopwatchSlice";
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import { useSelector,TypedUseSelectorHook } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {WebStorage} from "redux-persist/lib/types";


function createPersistStorage(): WebStorage {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            }
        };
    }
    return createWebStorage("local");
}
const storage = createPersistStorage();

// --- Setup Redux Persist ---
const persistConfig = {
  key: "root", // ชื่อ key ใน localStorage
  storage,
};

const rootReducer = combineReducers({
    scoreState: scoreSlice,
    stopwatchState: stopwatchReducer
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppSelecter:TypedUseSelectorHook<RootState> = useSelector