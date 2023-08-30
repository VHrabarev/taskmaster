import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebaseApp from '../../api/firebase';

interface oneTask {
    title: string,
    details: string,
    timespan: number,
};

interface setParam {
    newUserTasks: {
        [key: string]: oneTask,
    },
    userUID: string,
};

interface taskInterface {
    taskList: {
        [key: string]: oneTask,
    },
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

const getUserTasks = createAsyncThunk(
    "task/getUserTasks",
    async (userUID: string, thunkAPI) => {
        try {
            const dbRef = ref(getDatabase(firebaseApp));
            let snapshot = await get(child(dbRef, userUID));
            if(snapshot.exists()) {
                return snapshot.val();
            } else {
                throw new Error("No data available");
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

const setUserTask = createAsyncThunk(
    "task/setUserTask",
    async ({newUserTasks, userUID}: setParam, thunkAPI) => {
        try {
            const db = getDatabase(firebaseApp);
            await set(ref(db, `${userUID}/`), newUserTasks);
            thunkAPI.dispatch(getUserTasks(userUID));
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

const initialState: taskInterface = {
    taskList: {},
    error: {
        status: false,
        name: "",
        message: "",
    },
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserTasks.fulfilled, (store, action) => {
            store.taskList = action.payload;
            store.error.status = false;
            store.error.name = "";
            store.error.message = "";
        });
        builder.addCase(getUserTasks.pending, (store) => {
            store.error.status = false;
            store.error.name = "";
            store.error.message = "";
        });
        builder.addCase(getUserTasks.rejected, (store, action) => {
            const payload = action.payload as payloadActionError;
            if (payload) {
                store.error.status = true;
                store.error.name = payload.name;
                store.error.message = payload.message;
            };
        });
    },
});

export default taskSlice.reducer;
export {getUserTasks, setUserTask};