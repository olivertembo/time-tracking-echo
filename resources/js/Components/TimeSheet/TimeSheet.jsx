import React from "react";
import { Box } from "@mui/material";
import * as styles from "./styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { router } from "@inertiajs/react";

const useMutation = () => {
    return React.useCallback(
        (timeLog) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    if (timeLog.title?.trim() === "") {
                        reject(
                            new Error(
                                "Error while saving log: title can't be empty."
                            )
                        );
                    } else {
                        resolve({
                            ...timeLog,
                            title: timeLog.title?.toUpperCase(),
                        });
                    }
                }, 200)
            ),
        []
    );
};

const columns = [
    { field: "id", hide: true },
    {
        field: "title",
        headerName: "Title",
        width: 150,
        type: "string",
        editable: true,
    },
    { field: "col2", headerName: "Project", width: 150 },
    {
        field: "start_time",
        headerName: "Start Time",
        width: 150,
        type: "dateTime",
        editable: true,
    },
    {
        field: "end_time",
        headerName: "End Time",
        width: 150,
        type: "dateTime",
        editable: true,
    },
    {
        field: "col5",
        headerName: "Duration (HH mm SS)",
        width: 150,
        preProcessEditCellProps: (params) => {
            console.log("params", params);
            return params;
        },
    },
];

const TimeSheet = (props) => {
    const { timesheets } = props;
    const mutateRow = useMutation();
    const [snackbar, setSnackbar] = React.useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            console.log("newRow", {
                ...newRow,
            });

            if (newRow.title?.trim() === "") {
                throw new Error("Title can't be empty.");
            }

            router.put(`/timesheets/${newRow.id}`, { ...newRow });

            const response = await mutateRow(newRow);
            setSnackbar({
                children: "Successfully saved",
                severity: "success",
            });
            return response;
        },
        []
    );

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: "error" });
    }, []);

    const rows = timesheets.map((timesheet) => {
        return {
            id: timesheet.id,
            title: timesheet.title,
            col2: timesheet?.project?.name,
            start_time: timesheet.start_time,
            end_time: timesheet.end_time,
            col5: timesheet.duration,
        };
    });

    return (
        <Box sx={styles.container}>
            <Box sx={styles.innerContainer}>
                <DataGrid
                    components={{ Toolbar: GridToolbar }}
                    rows={rows}
                    columns={columns}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={3000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Box>
    );
};

export default TimeSheet;
