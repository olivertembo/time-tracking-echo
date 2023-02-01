import React from "react";
import { Box } from "@mui/material";
import * as styles from "./styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


export const ProjectsDataGrid = (props) => {
    const { projects } = props;
    
    const columns = [
        {
            field: "id",
            flex: 1},
        {
            field: "name",
            flex: 3,
        },
    ];

    const rows = projects.map((project) => {
        return {
            id: project.id,
            name: project.name,
        };
    });

    return (
        <Box sx={styles.container}>
            <Box sx={styles.innerContainer}>
                <DataGrid rows={rows} columns={columns} />
            </Box>
        </Box>
    );
};

export default ProjectsDataGrid;
