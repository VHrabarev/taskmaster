import { createSlice } from '@reduxjs/toolkit';

interface taskInterface {

};

const initialState: taskInterface = {

};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
});

export default taskSlice.reducer;