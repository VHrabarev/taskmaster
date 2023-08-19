import { Box, Typography, Grid, Card, CardHeader, CardContent, CardActions, IconButton, Badge, Button } from "@mui/material";
import { LocalizationProvider, DateCalendar }  from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useAppSelector, useAppDispatch } from "../../../hook";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { setUserTask } from "../../../store/reducers/taskReducer";

interface taskListType {
    [key: string]: {
        title: string,
        details: string,
        timespan: number,
    },
}

const TabPanelCalender: React.FC = function() {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [isShowAllTask, setIsShowAllTask] = useState<boolean>(false);
    const taskList = useAppSelector(store => store.task.taskList);
    const userUID = useAppSelector(store => store.user.userInfo.userUID);
    const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    const ServerDay = function(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
        const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
        
        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '🌚' : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    };

    const getHighlightedDays = function() {
        let newHighlightedDays: number[] = [];
        Object.values(taskList).map(value => {
            const taskMonth = dayjs.unix(value.timespan).month();
            const taskYear = dayjs.unix(value.timespan).year();
            if(date?.month() === taskMonth && date?.year() === taskYear) {
                newHighlightedDays.push(dayjs.unix(value.timespan).date());
            };
        });
        setHighlightedDays(Array.from(new Set(newHighlightedDays)));
    };

    const showTaskListByDay = function() {
        let newTaskList: taskListType = {};
        Object.entries(taskList).map(([key, value]) => {
            const taskDay = dayjs.unix(value.timespan).date();
            const taskMonth = dayjs.unix(value.timespan).month();
            const taskYear = dayjs.unix(value.timespan).year();
            if(date?.date() === taskDay && date?.month() === taskMonth && date?.year() === taskYear) {
                newTaskList = {...newTaskList, [key]: value};
            };
        });
        return newTaskList;
    };

    const changeDate = function(newDate: Dayjs | null) {
        setDate(newDate);
        setIsShowAllTask(false);
    };

    const deleteTaskByKey = function(key: string) {
        let newTasksList: taskListType = {};

        Object.entries(taskList).map(([taskKey, value]) => {
            if(taskKey !== key) {
                newTasksList = {...newTasksList, [taskKey]: value};
            };
        });

        dispatch(setUserTask({newUserTasks: newTasksList, userUID}));
    };

    useEffect(() => {
        getHighlightedDays();
    }, [date]);

    return (
        <Box component="section" sx={{ m: "0 20px 20px" }}>
            <Typography component="h3" hidden={true}>Calendar</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={date}
                    onChange={changeDate}
                    onMonthChange={changeDate}
                    onYearChange={changeDate}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {highlightedDays} as any,
                    }}
                />
            </LocalizationProvider>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography variant="h5" sx={{ mb: 4 }}>
                    {isShowAllTask ? "All tasks" :`Task for ${dayjs(date).format("DD.MM.YYYY")}`}
                </Typography>
                <Button onClick={() => setIsShowAllTask(true)} variant="contained">See all tasks</Button>
            </Box>
            <Grid container spacing={2}>
                {Object.keys(showTaskListByDay()).length ?
                Object.entries(isShowAllTask ? taskList : showTaskListByDay()).map(([key, value]) => {
                    const taskDate = dayjs.unix(value.timespan).format("DD.MM.YYYY");
                    return (
                        <Grid item xs={6} key={key}>
                            <Card>
                                <CardHeader
                                    title={value.title}
                                    subheader={taskDate}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">{value.details}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton onClick={() => deleteTaskByKey(key)} aria-label="Delete task">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                }) :
                <Typography variant="body2" color="text.secondary" sx={{ m: "0 auto" }}>There are no tasks</Typography>}
            </Grid>
        </Box>
    );
};

export default TabPanelCalender;