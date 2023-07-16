import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut } from "firebase/auth";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firebaseApp from '../../api/firebase';
import store from "..";

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

interface userInfo {
    loginStatus: boolean,
    fullName: string | null,
    email: string | null,
    phone: string | null,
    avatarUrl: string | null,
};

interface registrationState {
    userRegistration: {
        registrationError: boolean,
        registrationErrorMessage: string | undefined,
    },
    userLogin: {
        loginError: boolean,
        loginErrorMessage: string | undefined,
    },
    userInfo: userInfo,
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
        fullName: null,
        email: null,
        phone: null,
        avatarUrl: null,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        checkUserStatus: (state, action: PayloadAction<userInfo>) => {
            const { loginStatus, fullName, email, phone, avatarUrl } = action.payload;
            state.userInfo.loginStatus = loginStatus;
            state.userInfo.fullName = fullName;
            state.userInfo.email = email;
            state.userInfo.phone = phone;
            state.userInfo.avatarUrl = avatarUrl;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userCreate.fulfilled, (store) => {
            store.userRegistration.registrationError = false;
            store.userRegistration.registrationErrorMessage = "";
        });
        builder.addCase(userCreate.pending, (store) => {
            
        });
        builder.addCase(userCreate.rejected, (store, action) => {
            store.userRegistration.registrationError = true;
            store.userRegistration.registrationErrorMessage = action.error.code;
        });
        builder.addCase(userLogin.fulfilled, (store) => {
            store.userLogin.loginError = false;
            store.userLogin.loginErrorMessage = "";
        });
        builder.addCase(userLogin.pending, (store) => {
            
        });
        builder.addCase(userLogin.rejected, (store, action) => {
            store.userLogin.loginError = true;
            store.userLogin.loginErrorMessage = action.error.code;
        });
        builder.addCase(userLogout.fulfilled, (store) => {
            store.userInfo.loginStatus = false;
            store.userInfo.fullName = null;
            store.userInfo.email = null;
            store.userInfo.phone = null;
            store.userInfo.avatarUrl = null;
        });
    },
});

const {checkUserStatus} = userSlice.actions;

export default userSlice.reducer;
export {userCreate, userLogin, checkUserStatus, userLogout};