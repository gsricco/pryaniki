import React, {useState, useCallback, useMemo} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  LinearProgress,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import {
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentsQuery,
  useUpdateDocumentMutation
} from "../../api/pryanikApi";
import {DocumentItemType} from "../../api/types";
import {DisplayRow} from './DisplayRow';
import AddIcon from '@mui/icons-material/Add';
import {tableHeaders} from "../../common/constants/tableHeaders";
import EditableRow from "./EditableRow";

export const DataTable = () => {
  const {data, error, isLoading, refetch} = useGetDocumentsQuery();
  const [createRecord] = useCreateDocumentMutation();
  const [updateRecord] = useUpdateDocumentMutation();
  const [deleteRecord] = useDeleteDocumentMutation();
  const [newRecord, setNewRecord] = useState<DocumentItemType | null>(null);
  const [editableRecord, setEditableRecord] = useState<DocumentItemType | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSnackbarClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  }, []);

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleCreate = useCallback(() => {
    setNewRecord({
      id: '',
      documentStatus: '',
      employeeNumber: '',
      documentType: '',
      documentName: '',
      companySignatureName: '',
      employeeSignatureName: '',
      employeeSigDate: '',
      companySigDate: ''
    });
  }, []);

  const handleCancelCreate = useCallback(() => {
    setNewRecord(null);
  }, []);

  const handleSaveCreate = useCallback(async (values: DocumentItemType) => {
    setIsProcessing(true);
    try {
      await createRecord(values).unwrap();
      showSnackbar('Entry created successfully', 'success');
      refetch();
    } catch (e) {
      showSnackbar('Failed to create entry', 'error');
    } finally {
      setNewRecord(null);
      setIsProcessing(false);
    }
  }, [createRecord, refetch, showSnackbar]);

  const handleEdit = useCallback((record: DocumentItemType) => {
    setEditableRecord(record);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditableRecord(null);
  }, []);

  const handleSaveEdit = useCallback(async (values: DocumentItemType) => {
    setIsProcessing(true);
    try {
      await updateRecord({id: values.id, data: values}).unwrap();
      showSnackbar('Entry successfully updated', 'success');
      refetch();
    } catch (e) {
      showSnackbar('Failed to update record', 'error');
    } finally {
      setEditableRecord(null);
      setIsProcessing(false);
    }
  }, [updateRecord, refetch, showSnackbar]);

  const handleDelete = useCallback(async (id: string) => {
    setIsProcessing(true);
    try {
      await deleteRecord(id).unwrap();
      showSnackbar('Entry successfully deleted', 'success');
      refetch();
    } catch (e) {
      showSnackbar('Failed to delete entry', 'error');
    } finally {
      setIsProcessing(false);
    }
  }, [deleteRecord, refetch, showSnackbar]);

  const errorMessage = useMemo(() => {
    if (!error) return '';
    if ('status' in error) {
      return `${error.status}: ${JSON.stringify(error.data)}`;
    } else if ('message' in error) {
      return error.message ?? 'An error has occurred';
    }
    return 'An error has occurred';
  }, [error]);




  if (isLoading || isProcessing) return <LinearProgress/>;
  if (error) return <div>Error: {errorMessage}</div>;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      {isProcessing && <LinearProgress/>}
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data && Array.isArray(data.data) && data.data.length > 0 ? (
            data.data.map((record: DocumentItemType) => (
              editableRecord?.id === record.id ? (
                <EditableRow
                  key={record.id}
                  record={editableRecord}
                  handleSaveEdit={handleSaveEdit}
                  handleCancelEdit={handleCancelEdit}
                />
              ) : (
                <DisplayRow
                  key={record.id}
                  record={record}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9}>No data available</TableCell>
            </TableRow>
          )}
          {newRecord && (
            <EditableRow
              record={newRecord}
              handleSaveEdit={handleSaveCreate}
              handleCancelEdit={handleCancelCreate}
            />
          )}
        </TableBody>
      </Table>
      <Box sx={{textAlign: 'center'}}>
        <Button
          variant="outlined"
          onClick={handleCreate}
          disabled={!!newRecord}
          startIcon={<AddIcon/>}
          sx={{width: 1 / 2, mb: 2}}
        >
          Create a new entry
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
