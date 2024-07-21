import { TableRow, TableCell, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { EditableRowProps } from './types';
import { validationEditableRowSchema } from '../../common/utils/validationEditableRowSchema';
import { FC, memo } from 'react';
import {DocumentItemType} from "../../api/types";
import {fields} from "../../common/constants/fieldsTable";

const EditableRow: FC<EditableRowProps> = ({
                                             record,
                                             handleSaveEdit,
                                             handleCancelEdit,
                                           }) => {
  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const sanitizeValues = (values: DocumentItemType): DocumentItemType => {
    const sanitizedValues: DocumentItemType = { ...values };
    for (const key in sanitizedValues) {
      if (sanitizedValues[key] === null || sanitizedValues[key] === undefined) {
        sanitizedValues[key] = '';
      } else if (key === 'companySigDate' || key === 'employeeSigDate') {
        sanitizedValues[key] = isValidDate(sanitizedValues[key])
          ? new Date(sanitizedValues[key]).toISOString()
          : '';
      }
    }
    return sanitizedValues;
  };

  const formik = useFormik<DocumentItemType>({
    initialValues: sanitizeValues(record),
    validationSchema: validationEditableRowSchema,
    onSubmit: (values) => {
      handleSaveEdit(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    submitForm,
  } = formik;

  return (
    <TableRow>
      {fields.map((field) => (
        <TableCell key={field}>
          <TextField
            value={values[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={field as string}
            label={field}
            error={touched[field] && Boolean(errors[field])}
            helperText={touched[field] && errors[field]}
          />
        </TableCell>
      ))}
      <TableCell>
        <>
          <Button onClick={submitForm}>Save</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </>
      </TableCell>
    </TableRow>
  );
};

export default memo(EditableRow);
