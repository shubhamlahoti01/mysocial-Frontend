import React, { useEffect, useState } from 'react';
import './Login.css';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { loginUser } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
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
      <form className='loginForm' onSubmit={loginHandler}>
        <Typography variant='h3' style={{ padding: '2vmax' }}>
          MySocial
        </Typography>

        <input
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to='/forgot/password'>
          <Typography>Forgot Password?</Typography>
        </Link>
        <Button type='submit'>Login</Button>
        <Link to='/register'>
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
