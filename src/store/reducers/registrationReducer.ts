import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../../api/firebase';

interface userCreateDate {
    email: string;
    password: string;
};

const userCreate = createAsyncThunk(
    "registration/userCreate",
    async (data: userCreateDate, thunkAPI) => {
        try {
            const auth = getAuth(firebaseApp);
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        };
    },
);

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
    extraReducers: (builder) => {
        builder.addCase(userCreate.fulfilled, (store, action) => {
            console.log(action.payload);
        });
    },
});

export default registrationSlice.reducer;
export {userCreate};