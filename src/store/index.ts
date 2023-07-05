import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./reducers/registrationReducer";

const store = configureStore({
    reducer: {
        registration: registrationReducer,
    },
});

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;