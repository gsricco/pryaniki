import {TableRow, TableCell, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {DisplayRowProps} from "./types";
import {FC} from "react";


export const DisplayRow: FC<DisplayRowProps> = ({
                                                        record,
                                                        handleEdit,
                                                        handleDelete,
                                                      }) => {
  return (
    <TableRow key={record.id}>
      <TableCell>{record.companySigDate}</TableCell>
      <TableCell>{record.companySignatureName}</TableCell>
      <TableCell>{record.documentName}</TableCell>
      <TableCell>{record.documentStatus}</TableCell>
      <TableCell>{record.documentType}</TableCell>
      <TableCell>{record.employeeNumber}</TableCell>
      <TableCell>{record.employeeSigDate}</TableCell>
      <TableCell>{record.employeeSignatureName}</TableCell>
      <TableCell>
        <>
          <Button onClick={() => handleEdit(record)} startIcon={<EditIcon/>}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} startIcon={<DeleteForeverIcon/>}>Delete</Button>
        </>
      </TableCell>
    </TableRow>
  );
};

