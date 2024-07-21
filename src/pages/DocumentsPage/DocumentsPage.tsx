import {Container, Paper, TableContainer, Typography} from '@mui/material';
import {DataTable} from "../../features/DataTable/DataTable";

export const DocumentsPage = () => {
  return (
    <Container maxWidth="xl" sx={{mt:10}}>
      <Typography variant="h4"> Documents</Typography>
      <TableContainer component={Paper}>
        <DataTable/>
      </TableContainer>
    </Container>
  );
};

