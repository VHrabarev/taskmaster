import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut, updateProfile, updateEmail, updatePassword, signInWithPopup } from "firebase/auth";
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
    userInfo: userInfo,
    error: {
        status: boolean,
        name: string,
        message: string,
    },
};

interface payloadActionError {
    name: string,
    message: string,
};

const userCreate = createAsyncThunk(
    "user/userCreate",
    async ({email, password}: userData, thunkAPI) => {
        try {
            const auth = getAuth(firebaseApp);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error: any) {
            const payloadError: payloadActionError = {name: "Error", message: "An unknown error has occurred"}
            if(error instanceof Error) {
                payloadError.name = error.name;
                payloadError.message = error.message;
            };
            return thunkAPI.rejectWithValue(payloadError);
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
            const payloadError: payloadActionError = {name: "Error", message: "An unknown error has occurred"}
            if(error instanceof Error) {
                payloadError.name = error.name;
                payloadError.message = error.message;
            };
            return thunkAPI.rejectWithValue(payloadError);
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
            const payloadError: payloadActionError = {name: "Error", message: "An unknown error has occurred"}
            if(error instanceof Error) {
                payloadError.name = error.name;
                payloadError.message = error.message;
            };
            return thunkAPI.rejectWithValue(payloadError);
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
            const payloadError: payloadActionError = {name: "Error", message: "An unknown error has occurred"}
            if(error instanceof Error) {
                payloadError.name = error.name;
                payloadError.message = error.message;
            };
            return thunkAPI.rejectWithValue(payloadError);
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

const userCreateWithGoogle = createAsyncThunk(
    "user/userCreateWithGoogle",
    async (_, thunkAPI) => {
        const auth = getAuth(firebaseApp);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if(result) {
                const user = result.user;
                return user;
            }
        } catch (error: any) {
            const payloadError: payloadActionError = {name: "Error", message: "An unknown error has occurred"}
            if(error instanceof Error) {
                payloadError.name = error.name;
                payloadError.message = error.message;
            };
            return thunkAPI.rejectWithValue(payloadError);
        };
    },
);

const initialState: registrationState = {
    userInfo: {
        loginStatus: false,
        fullName: null,
        email: null,
        avatarUrl: null,
        userUID: "",
    },
    error: {
        status: false,
        name: "",
        message: "",
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
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userCreate.pending, (store) => {
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userCreate.rejected, (store, action) => {
            const payload = action.payload as payloadActionError;
            if (payload) {
                store.error.status = true;
                store.error.name = payload.name;
                store.error.message = payload.message;
            };
        });
        builder.addCase(userLogin.fulfilled, (store) => {
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userLogin.pending, (store) => {
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userLogin.rejected, (store, action) => {
            const payload = action.payload as payloadActionError;
            if (payload) {
                store.error.status = true;
                store.error.name = payload.name;
                store.error.message = payload.message;
            };
        });
        builder.addCase(userLogout.fulfilled, (store) => {
            store.userInfo.loginStatus = false;
            store.userInfo.fullName = null;
            store.userInfo.email = null;
            store.userInfo.avatarUrl = null;
        });
        builder.addCase(userUpdateProfile.fulfilled, (store) => {
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userUpdateProfile.pending, (store) => {
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userUpdateProfile.rejected, (store, action) => {
            const payload = action.payload as payloadActionError;
            if (payload) {
                store.error.status = true;
                store.error.name = payload.name;
                store.error.message = payload.message;
            };
        });
        builder.addCase(userUpdatePassword.fulfilled, (store) => {
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userUpdatePassword.pending, (store) => {
            store.error.status = false;
            store.error.name ="";
            store.error.message = "";
        });
        builder.addCase(userUpdatePassword.rejected, (store, action) => {
            const payload = action.payload as payloadActionError;
            if (payload) {
                store.error.status = true;
                store.error.name = payload.name;
                store.error.message = payload.message;
            };
        });
    },
});

const {checkUserStatus} = userSlice.actions;

export default userSlice.reducer;
export {userCreate, userLogin, checkUserStatus, userLogout, userUpdateProfile, userUpdatePassword, userCreateWithGoogle};