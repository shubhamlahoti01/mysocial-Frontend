import React, { useState } from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../Actions/User';
import './UpdateProfile.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-hot-toast';

const UpdateProfile = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message: updateMessage,
  } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState('');
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      dispatch({ type: 'clearErrors' });
      toast.error(error);
    }
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: 'clearErrors' });
    }
    if (updateMessage) {
      toast.success(updateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, updateError, updateMessage]);
  return loading ? (
    <Loader />
  ) : (
    <div className='updateProfile'>
      <form onSubmit={submitHandler} className='updateProfileForm'>
        <Typography variant='h3' style={{ padding: '2vmax' }}>
          MySocial
        </Typography>
        <Avatar
          src={avatarPrev}
          alt='User'
          sx={{ height: '10vmax', width: '10vmax' }}
        />
        <input type='file' accept='image/*' onChange={handleImageChange} />
        <input
          className='updateProfileInputs'
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='updateProfileInputs'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type='submit'>
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
