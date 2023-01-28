import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { forgotPassword } from '../../Actions/User';
import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.like);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (error) {
      dispatch({ type: 'clearErrors' });
      toast.error(error);
    }
    if (message) {
      dispatch({ type: 'clearMessage' });
      toast.success(message);
    }
  }, [error, message, dispatch]);
  return (
    <div className='forgotPassword'>
      <form className='forgotPasswordForm' onSubmit={submitHandler}>
        <Typography variant='h3' style={{ padding: '2vmax' }}>
          MySocial
        </Typography>
        <input
          type='email'
          placeholder='Email'
          required
          className='forgotPasswordInputs'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button disabled={loading} type='submit'>
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
