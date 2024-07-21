import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useLoginMutation } from './api';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      await login({ username, password });
      // Добавить логику для сохранения токена в localStorage и перенаправление на следующую страницу
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} disabled={isLoading}>Login</Button>
      {isError && <Typography variant="body2" color="error">Failed to login</Typography>}
    </div>
  );
};

