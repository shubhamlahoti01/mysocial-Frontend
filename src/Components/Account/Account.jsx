import React, { useEffect, useState } from 'react';
import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyProfile, getMyPosts, logoutUser } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../User/User';
import { toast } from 'react-hot-toast';

const Account = () => {
  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message: likeMessage,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success('Logged out Successfully');
  };
  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch({ type: 'clearErrors' });
      toast.error(error);
    }
    if (likeError) {
      dispatch({ type: 'clearErrors' });
      toast.error(likeError);
    }
    if (likeMessage) {
      dispatch({ type: 'clearMessage' });
      toast.success(likeMessage);
    }
    // [alert,error,message] when we use react-alert
  }, [likeError, likeMessage, error, dispatch]);

  return userLoading === true || loading === true ? (
    <Loader />
  ) : (
    <div className='account'>
      <div className='accountleft'>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant='h6'>You Have Not Created Any Post</Typography>
        )}
      </div>
      <div className='accountright'>
        <Avatar
          src={user.avatar.url}
          sx={{ height: '8vmax', width: '8vmax' }}
        />
        <Typography variant='h5'>{user.name}</Typography>
        <div>
          <button>
            <Typography onClick={() => setFollowersToggle(!followersToggle)}>
              Followers
            </Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button>
            <Typography onClick={() => setFollowingToggle(!followingToggle)}>
              Following
            </Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant='contained' onClick={logoutHandler}>
          Logout
        </Button>
        <Link to='/update/profile'>Edit Profile</Link>
        <Link to='/update/password'>Change Password</Link>
        <Button
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
          variant='text'
          style={{ color: 'red', margin: '2vmax' }}
        >
          Delete My Profile
        </Button>
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className='DialogBox'>
            <Typography variant='h4'>Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((item) => (
                <User
                  key={item._id}
                  userId={item._id}
                  name={item.name}
                  avatar={item.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: '2vmax' }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className='DialogBox'>
            <Typography variant='h4'>Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: '2vmax' }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
