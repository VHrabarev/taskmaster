import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;