import { Box, Typography, Grid, Card, CardHeader, CardContent, CardActions, IconButton, Badge } from "@mui/material";
import { LocalizationProvider, DateCalendar }  from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useAppSelector, useAppDispatch } from "../../../hook";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

const TabPanelCalender: React.FC = function() {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const taskList = useAppSelector(store => store.task.taskList);
    const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

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

    useEffect(() => {
        getHighlightedDays();
    }, [date]);

    return (
        <Box component="section" sx={{ m: "0 20px 20px" }}>
            <Typography component="h3" hidden={true}>Calendar</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    onMonthChange={(newDate) => setDate(newDate)}
                    onYearChange={(newDate) => setDate(newDate)}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {highlightedDays} as any,
                    }}
                />
            </LocalizationProvider>
            <Grid container spacing={2}>
                {Object.entries(taskList).map(([key, value]) => {
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
                                    <IconButton aria-label="Delete task">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default TabPanelCalender;