import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;