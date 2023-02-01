import React, { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Grid,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
    Paper,
} from "@mui/material";
import * as styles from "./styles";
import { router, usePage } from "@inertiajs/react";

const TimeTracker = () => {
    const { errors, projects = [] } = usePage().props;
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [isTimerRunning, setIsTimerRunning] = React.useState(false);
    const [timer, setTimer] = React.useState(0);
    const [project, setProject] = React.useState("");
    const timerRef = React.useRef(null);

    const handleStartTimer = () => {
        setTimer(0);
        setStartTime(new Date());
        setEndTime(null);
        setIsTimerRunning(true);
    };

    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };

    const handleEndTimer = () => {
        const newEndTime = new Date();
        setEndTime(newEndTime);
        setIsTimerRunning(false);

        if (startTime && newEndTime) {
            router.post("/timesheets", {
                start_time: startTime,
                end_time: newEndTime,
                project_id: project,
                title: title,
            });
        }
    };

    const handleTimer = () => {
        if (!project) {
            alert("Please select a project");
            return;
        }
        if (!title) {
            alert("Please enter a title");
            return;
        }
        if (isTimerRunning) {
            handleEndTimer();
        } else {
            handleStartTimer();
        }
    };

    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = window.setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
        } else {
            window.clearInterval(timerRef.current);
        }
        return () => {
            window.clearInterval(timerRef.current);
        };
    }, [isTimerRunning]);

    return (
        <>
        <Paper>
        <Box sx={styles.container}>
            <Typography variant="body1" sx={{ margin: 2}}>Automatic Time Tracker</Typography>
            <form>
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
                                    <MenuItem key={project.id} value={project.id}>
                                        {project.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            required
                            size="small"
                            id="title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <div>{errors.title}</div>}
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1">
                            Tracker:{" "}
                            <Typography
                                color={isTimerRunning ? "springgreen" : ""}
                                variant="body1"
                                component="span"
                            >
                                {timer} Seconds
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            Start: {startTime?.toLocaleTimeString()}
                        </Typography>
                        <Typography>
                            End: {endTime?.toLocaleTimeString()}
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    disabled={!project || !title}
                    variant="outlined"
                    color="primary"
                    onClick={handleTimer}
                >
                    {isTimerRunning ? "Stop" : "Start"}
                </Button>
            </form>
        </Box>
        </Paper>
        </>
    );
};

export default TimeTracker;
