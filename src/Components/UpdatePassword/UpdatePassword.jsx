import './UpdatePassword.css';
import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { updatePassword } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();

  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
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
  }, [error, dispatch, message]);
  return (
    <div className='login'>
      <form className='loginForm' onSubmit={submitHandler}>
        <Typography variant='h3' style={{ padding: '2vmax' }}>
          MySocial
        </Typography>

        <input
          type='password'
          placeholder='Old Password'
          required
          value={oldPassword}
          className='updatePasswordInputs'
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='New Password'
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button disabled={loading} type='submit'>
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
