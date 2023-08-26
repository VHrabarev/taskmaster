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
    getUserTask: {
        taskErrorStatus: boolean,
        taskErrorMessage: string,
    },
    taskList: {
        [key: string]: oneTask,
    },
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
            if(error instanceof Error) {
                return thunkAPI.rejectWithValue(`Error message: ${error.message}`);
            } else {
                return thunkAPI.rejectWithValue('An unknown error has occurred');
            };
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
            if(error instanceof Error) {
                return thunkAPI.rejectWithValue(`Error message: ${error.message}`);
            } else {
                return thunkAPI.rejectWithValue('An unknown error has occurred');
            };
        };
    },
);

const initialState: taskInterface = {
    getUserTask: {
        taskErrorStatus: false,
        taskErrorMessage: "",
    },
    taskList: {},
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserTasks.fulfilled, (store, action) => {
            store.getUserTask.taskErrorStatus = false;
            store.getUserTask.taskErrorMessage = "";
            store.taskList = action.payload;
        });
    },
});

export default taskSlice.reducer;
export {getUserTasks, setUserTask};