import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut, onAuthStateChanged  } from "firebase/auth";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebaseApp from '../../api/firebase';

interface userData {
    email: string;
    password: string;
};

const userCreate = createAsyncThunk(
    "user/userCreate",
    async ({email, password}: userData, thunkAPI) => {
        try {
            const auth = getAuth(firebaseApp);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        };
    },
);

const userLogin = createAsyncThunk(
    "user/userLogin",
    async ({email, password}: userData, thunkAPI) => {
        try {
            const auth = getAuth(firebaseApp);
            await setPersistence(auth, browserLocalPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        };
    },
);

const userLogout = createAsyncThunk(
    "user/userLogout",
    async () => {
        const auth = getAuth(firebaseApp);
        await signOut(auth);
    },
);

interface registrationState {
    userRegistration: {
        registrationError: boolean,
        registrationErrorMessage: string,
    },
    userLogin: {
        loginError: boolean,
        loginErrorMessage: string,
    },
    userInfo: {
        loginStatus: boolean,
    }
};

const initialState: registrationState = {
    userRegistration: {
        registrationError: false,
        registrationErrorMessage: "",
    },
    userLogin: {
        loginError: false,
        loginErrorMessage: "",
    },
    userInfo: {
        loginStatus: false,
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        checkUserStatus: (store) => {
            const auth = getAuth(firebaseApp);
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    
                } else {
                    
                };
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userCreate.fulfilled, (store, action) => {
            store.userRegistration.registrationError = false;
            store.userRegistration.registrationErrorMessage = "";
        });
        builder.addCase(userLogin.fulfilled, (store, action) => {
            store.userLogin.loginError = false;
            store.userLogin.loginErrorMessage = "";
            store.userInfo.loginStatus = true;
        });
        builder.addCase(userLogout.fulfilled, (store) => {
            store.userInfo.loginStatus = false;
        });
    },
});

const {checkUserStatus} = userSlice.actions;

export default userSlice.reducer;
export {userCreate, userLogin, checkUserStatus, userLogout};