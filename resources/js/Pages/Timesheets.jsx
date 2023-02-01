import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TimeSheet from "@/Components/TimeSheet";
import dayjs from "dayjs";
import {
    Box,
    Button,
    Typography,
    TextField,
    Grid,
    Container,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import { router, usePage } from "@inertiajs/react";
import Main from "@/Components/Main";

export default function Timesheet(props) {
    const {
        timesheets,
        totalDuration,
        endTime: initialEndTime = null,
        startTime: initialStartTime = null,
    } = props;
    
    const [startTime, setStartTime] = React.useState(() => {
        if (initialStartTime) {
            return dayjs(initialStartTime);
        } else {
            return null;
        }
    });
    const [endTime, setEndTime] = React.useState(() => {
        if (initialEndTime) {
            return dayjs(initialEndTime);
        } else {
            return null;
        }
    });
    const [error, setError] = React.useState("");

    const handleReset = () => {
        setStartTime(null);
        setEndTime(null);

        router.get("/timesheets");
    };

    const handleSubmit = () => {
        if (startTime && endTime) {
            const start_time = new Date(startTime);
            const end_time = new Date(endTime);
            const isTimeValid = end_time > start_time;

            if (isTimeValid) {
                router.get("/timesheets", {
                    start_time,
                    end_time,
                });
            } else {
                setError("End time must be greater than start time");
            }
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={null}
        >
            <Head title="Time Logs" />
            <Main>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <DateTimePicker
                                    ampm={false}
                                    value={startTime}
                                    onChange={(newValue) =>
                                        setStartTime(newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            helperText="Start Time"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <DateTimePicker
                                    size="small"
                                    disabled={!startTime}
                                    ampm={false}
                                    value={endTime}
                                    minTime={startTime}
                                    onChange={(newValue) =>
                                        setEndTime(newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            helperText="End Time"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button onClick={handleSubmit}>Apply</Button>
                                <Button onClick={handleReset}>Reset</Button>
                            </Grid>
                        </Grid>
                        <Stack spacing={3}>
                            {error && (
                                <Typography color="darkorange">
                                    {error}
                                </Typography>
                            )}
                        </Stack>
                    </LocalizationProvider>
                </Box>
                <Typography variant="body1" component="h1" gutterBottom>
                    {totalDuration} hours
                </Typography>
                {timesheets.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            No records found
                        </h2>
                    </div>
                )}
                {timesheets.length > 0 && <TimeSheet timesheets={timesheets} />}
            </Main>
        </AuthenticatedLayout>
    );
}
