import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProjectsDataGrid from "@/Components/ProjectsDataGrid";
import { Typography, Container, Button, Box } from "@mui/material";
import Main from "@/Components/Main";
import AddProjectModal from "@/Components/AddProjectModal/AddProjetModal";

export default function LogTime(props) {
    const { projects } = props;
    const [isProjectModalOpen, setIsProjectModalOpen] = React.useState(false);

    const handleOpenProjectModal = () => {
        setIsProjectModalOpen(true);
    }

    const handleCloseProjectModal = () => {
        setIsProjectModalOpen(false);
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={null}
        >
            <Head title="Projects" />
            <Main>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <Button variant="outlined" onClick={handleOpenProjectModal}>Add Project</Button>
                </Box>
                <ProjectsDataGrid projects={projects} />
                <AddProjectModal open={isProjectModalOpen} handleClose={handleCloseProjectModal} />
            </Main>
        </AuthenticatedLayout>
    );
}
