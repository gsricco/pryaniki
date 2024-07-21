import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, FormControl, LinearProgress, OutlinedInput, TextField} from '@mui/material';
import {ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers} from 'formik';
import {useLoginMutation} from '../../api/pryanikApi';
import {useAuth} from '../../common/context/AuthContext';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {validationLoginSchema} from "../../common/utils/validationLoginShema";
import {LoginType} from "../../api/types";

export const LoginForm = () => {
  const [login, {isLoading}] = useLoginMutation();
  const {login: loginContext} = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getErrorMessage = (error: unknown) => {
    if (isFetchBaseQueryError(error)) {
      if (error.status === 400) {
        return 'Invalid username or password';
      }
      return `Status: ${error.status}, Message: ${JSON.stringify(error.data)}`;
    } else {
      return 'An error occurred';
    }
  };

  const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'data' in error
    );
  };

  const handleSubmit = async (values: LoginType, {setSubmitting}: FormikHelpers<LoginType>) => {
    try {
      const result = await login({username: values.username, password: values.password}).unwrap();

      if (result.error_code === 2004) setErrorMessage(result.error_text || 'An error occurred');
      else {
        setErrorMessage(null);
        loginContext(result.data.token);
      }
    } catch (err) {
      setErrorMessage(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <LinearProgress/>}
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={validationLoginSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Box mb={2}>
              <Field name="username">
                {({field, meta}: FieldProps) => (
                  <TextField
                    label="Username"
                    {...field}
                    fullWidth
                    margin="normal"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={<ErrorMessage name="username" />}
                  />
                )}
              </Field>
            </Box>
            <Box mb={2}>
              <Field name="password">
                {({field, meta}: FieldProps) => (
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={meta.touched && Boolean(meta.error)}
                    />
                    {meta.touched && meta.error && (
                      <Box color="error.main" mt={1}>{meta.error}</Box>
                    )}
                  </FormControl>
                )}
              </Field>
            </Box>
            <Button type="submit" variant="contained" color="primary" sx={{p: 2}} fullWidth
                    disabled={isSubmitting || isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
            {errorMessage && (
              <Alert severity="error" style={{marginTop: '16px'}}>
                {errorMessage}
              </Alert>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
