import * as React from "react";
import {
    Card,
    Typography,
    Modal,
    Button,
    Box,
    CardActions,
    CardContent,
    TextField,
    Alert,
    Snackbar
} from "@mui/material";
import { router } from "@inertiajs/react";
import * as styles from "./styles";

export const AddProjectModal = (props) => {
    const { open = false, handleClose } = props;
    const [name, setName] = React.useState("");
    const [snackbar, setSnackbar] = React.useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleSubmit = () => {
        if (name === "") return;
        router.post("/projects", {
            name,
        });
        handleClose();
        handleStatusUpdate({ message: "Project Added Successfully" });
    };

    const handleStatusUpdate = React.useCallback((status) => {
      setSnackbar({ children: status.message, severity: "success" });
  }, []);



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={styles.container}>
                    <CardContent>
                        <Box>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Add New Project
                            </Typography>
                            <form>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="name"
                                    variant="standard"
                                    type="text"
                                    sx={{
                                        outline: "none",
                                    }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </form>
                        </Box>
                    </CardContent>
                    <CardActions
                        sx={{
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={name === ""}
                            size="small"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
            {!!snackbar && (
                    <Snackbar
                        open
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        onClose={handleCloseSnackbar}
                        autoHideDuration={3000}
                    >
                        <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}
        </div>
    );
};

export default AddProjectModal;
