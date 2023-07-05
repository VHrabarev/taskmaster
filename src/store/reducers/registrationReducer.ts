import { createSlice } from '@reduxjs/toolkit';

interface registrationState {
    userName: string,
};

const initialState: registrationState = {
    userName: "User",
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {

    },
});

export default registrationSlice.reducer;