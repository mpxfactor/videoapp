import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../redux/videoSlice";
import userReducer from "../redux/userSlice";
import commentReducer from "../redux/commentSlice";

/////////////////////////////////////////////////////////////////
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    videos: videoReducer,
    users: userReducer,
    comments: commentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
/////////////////////////////////////////////////////////////////

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
