import { Container } from "@mui/material";

export const Main = ({ children }) => {
    return (
        <Container sx={{
            marginTop: "2rem",
        }}>
            {children}
        </Container>
    );
};

export default Main;
