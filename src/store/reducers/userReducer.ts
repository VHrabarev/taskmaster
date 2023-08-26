import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firebaseApp from '../../api/firebase';

interface userData {
    email: string;
    password: string;
};

interface userInfo {
    loginStatus: boolean,
    fullName: string | null,
    email: string | null,
    avatarUrl: string | null,
    userUID: string,
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
    userUpdateProfile: {
        updateError: boolean,
        updateErrorMessage: string | undefined,
    },
    userUpdatePassword: {
        updateError: boolean,
        updateErrorMessage: string | undefined,
    },
};

const userCreate = createAsyncThunk(
    "user/userCreate",
    async ({email, password}: userData, thunkAPI) => {
        try {
            const auth = getAuth(firebaseApp);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error: any) {
            if(error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error has occurred');
            };
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
        } catch (error: any) {
            if(error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error has occurred');
            };
        };
    },
);

const userUpdateProfile = createAsyncThunk(
    "user/userUpdateProfile",
    async ({fullName, email, avatarUrl, loginStatus, userUID}: userInfo, thunkAPI) => {
        try {
            const {currentUser} = getAuth(firebaseApp);
            if(currentUser && email) {
                await updateProfile(currentUser, {displayName: fullName, photoURL: avatarUrl});
                await updateEmail(currentUser, email);
                thunkAPI.dispatch(checkUserStatus({loginStatus, fullName, email, avatarUrl, userUID}));
            }
        } catch (error: any) {
            if(error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error has occurred');
            };
        };
    },
);

const userUpdatePassword = createAsyncThunk(
    "user/userUpdatePassword",
    async (newPassword: string, thunkAPI) => {
        try {
            const {currentUser} = getAuth(firebaseApp);
            if(currentUser) {
                await updatePassword(currentUser, newPassword);
            } else {
                throw new Error("User is not signed-in");
            };
        } catch (error: any) {
            if(error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error has occurred');
            };
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
        avatarUrl: null,
        userUID: "",
    },
    userUpdateProfile: {
        updateError: false,
        updateErrorMessage: "",
    },
    userUpdatePassword: {
        updateError: false,
        updateErrorMessage: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        checkUserStatus: (state, action: PayloadAction<userInfo>) => {
            const { loginStatus, fullName, email, avatarUrl, userUID } = action.payload;
            state.userInfo.loginStatus = loginStatus;
            state.userInfo.fullName = fullName;
            state.userInfo.email = email;
            state.userInfo.avatarUrl = avatarUrl;
            state.userInfo.userUID = userUID;
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
            store.userRegistration.registrationErrorMessage = action.error.message;
        });
        builder.addCase(userLogin.fulfilled, (store) => {
            store.userLogin.loginError = false;
            store.userLogin.loginErrorMessage = "";
        });
        builder.addCase(userLogin.pending, (store) => {
            
        });
        builder.addCase(userLogin.rejected, (store, action) => {
            store.userLogin.loginError = true;
            store.userLogin.loginErrorMessage = action.error.message;
        });
        builder.addCase(userLogout.fulfilled, (store) => {
            store.userInfo.loginStatus = false;
            store.userInfo.fullName = null;
            store.userInfo.email = null;
            store.userInfo.avatarUrl = null;
        });
        builder.addCase(userUpdateProfile.fulfilled, (store) => {
            store.userUpdateProfile.updateError = false;
            store.userUpdateProfile.updateErrorMessage = "";
        });
        builder.addCase(userUpdateProfile.pending, (store) => {
            
        });
        builder.addCase(userUpdateProfile.rejected, (store, action) => {
            store.userUpdateProfile.updateError = true;
            store.userUpdateProfile.updateErrorMessage = action.error.message;
        });
        builder.addCase(userUpdatePassword.fulfilled, (store) => {
            store.userUpdatePassword.updateError = false;
            store.userUpdatePassword.updateErrorMessage = "";
        });
        builder.addCase(userUpdatePassword.pending, (store) => {
            
        });
        builder.addCase(userUpdatePassword.rejected, (store, action: any) => {
            store.userUpdatePassword.updateError = true;
            store.userUpdatePassword.updateErrorMessage = action.payload;
        });
    },
});

const {checkUserStatus} = userSlice.actions;

export default userSlice.reducer;
export {userCreate, userLogin, checkUserStatus, userLogout, userUpdateProfile, userUpdatePassword};