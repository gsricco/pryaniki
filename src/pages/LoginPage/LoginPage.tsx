import {Container, Typography} from '@mui/material';
import {LoginForm} from "../../features/Auth/LoginForm";

export const LoginPage = () => {

  return (
    <Container maxWidth="sm" sx={{mt:10}}>
      <Typography variant="h4">Login</Typography>
      <LoginForm />
    </Container>
  );
};

