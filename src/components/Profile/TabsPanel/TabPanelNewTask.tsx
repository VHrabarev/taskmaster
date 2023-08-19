import { Box, Typography, TextField, Button } from "@mui/material";
import React, { FormEvent, useState, useRef } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useAppSelector, useAppDispatch } from "../../../hook";
import { Dayjs } from 'dayjs';
import { setUserTask } from "../../../store/reducers/taskReducer";

const TabPanelNewTask: React.FC = function() {
    const [date, setDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);
    const taskTitleRef = useRef<HTMLInputElement>();
    const taskDetailsRef = useRef<HTMLInputElement>();
    const userUID = useAppSelector(store => store.user.userInfo.userUID);
    const taskList = useAppSelector(store => store.task.taskList);
    const dispatch = useAppDispatch();

    const onSubmitCreateNewTask = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newUserTasks = {
            ...taskList,
            [Date.now()]: {
                title: taskTitleRef.current?.value,
                timespan: date?.add(time?.hour() || 0, "hour").add(time?.minute() || 0, "minute").unix(),
                details: taskDetailsRef.current?.value,
            }, 
        };
        dispatch(setUserTask({newUserTasks, userUID}));
    };

    return (
        <Box component="section" sx={{ p: "5px 20px 20px" }}>
            <Typography component="h3" variant="h6" sx={{ mb: 1 }}>Create New Task</Typography>
            <Box component="form" onSubmit={onSubmitCreateNewTask}>
                <TextField inputRef={taskTitleRef} label="Title" variant="outlined" sx={{ width: "100%", mb: 2 }} />
                <Box sx={{ display: "flex", mb: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={date} onChange={(newDate) => setDate(newDate)} label="Date" sx={{ flexGrow: 1, mr: 2 }} disablePast />
                        <TimePicker value={time} onChange={(newTime) => setTime(newTime)} label="Time" sx={{ flexGrow: 1 }} />
                    </LocalizationProvider>
                </Box>
                <TextField inputRef={taskDetailsRef} label="Details" multiline rows={4} sx={{ width: "100%", mb: 2 }} />
                <Button variant="contained" type="submit">Create</Button>
            </Box>
        </Box>
    );
};

export default TabPanelNewTask;