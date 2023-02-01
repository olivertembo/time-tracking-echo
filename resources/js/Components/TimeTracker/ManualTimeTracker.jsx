import * as React from "react";
import dayjs from "dayjs";
import { Box, Button, Typography, Grid, FormControl, Select, InputLabel, MenuItem, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { router, usePage } from "@inertiajs/react";


export default function ManualTimeTracker() {
    const { projects = [] } = usePage().props;
    const [startTime, setStartTime] = React.useState(dayjs());
    const [endTime, setEndTime] = React.useState(null);
    const [error, setError] = React.useState("");
    const [project, setProject] = React.useState("");

    const handleStartTimer = (newValue) => {
        setStartTime(newValue);
    };

    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };

    const handleSubmit = () => {
        if (!project) {
            alert("Please select a project");
            return;
        }
        if (startTime && endTime) {
            const start_time = new Date(startTime);
            const end_time = new Date(endTime);
            const isTimeValid = end_time > start_time;

            if (isTimeValid) {
                router.post("/timesheets", {
                    start_time,
                    end_time,
                    project_id: project,
                    title: "Manual Time Entry",
                });
            } else {
                setError("End time must be greater than start time");
            }
        }
    };

    return (
        <Paper
            sx={{
                marginTop: "20px",
            }}
        >
            <Typography variant="body1" sx={{ margin: 2}}>Manual Time Tracker</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                    sx={{
                        padding: "20px",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="project-select-label">
                                    Project
                                </InputLabel>
                                <Select
                                    size="small"
                                    labelId="project-select-label"
                                    id="demo-simple-select"
                                    value={project}
                                    label="Project"
                                    onChange={handleProjectChange}
                                >
                                    {projects.map((project) => (
                                        <MenuItem
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                        <DateTimePicker
                            value={startTime}
                            onChange={(newValue) => handleStartTimer(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    helperText="Start Time"
                                />
                            )}
                        />
                        </Grid> 
                        <Grid item xs={3}>
                        <DateTimePicker
                            value={endTime}
                            minTime={startTime}
                            onChange={(newValue) => setEndTime(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} helperText="End Time" />
                            )}
                        />
                        </Grid>
                        {error && (
                            <Typography color="darkorange">{error}</Typography>
                        )}
                    </Grid>
                    <Button variant="outlined" disabled={!project || !startTime || !endTime} onClick={handleSubmit}>Log time</Button>
                </Box>
            </LocalizationProvider>
        </Paper>
    );
}
