import { Avatar, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Actions/User';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(name, email, password, avatar));
  };
  useEffect(() => {
    if (error) {
      dispatch({ type: 'clearErrors' });
      toast.error(error);
    }
  }, [dispatch, error]);

  return (
    <div className='register'>
      <form onSubmit={submitHandler} className='registerForm'>
        <Typography variant='h3' style={{ padding: '2vmax' }}>
          MySocial
        </Typography>
        <Avatar
          src={avatar}
          alt='User'
          sx={{ height: '10vmax', width: '10vmax' }}
        />
        <input type='file' accept='image/*' onChange={handleImageChange} />
        <input
          className='registerInputs'
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='registerInputs'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='registerInputs'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to='/'>
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>
        <Button disabled={loading} type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
