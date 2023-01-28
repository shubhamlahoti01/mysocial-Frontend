import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFollowingPosts } from '../../Actions/User';
import Post from '../Post/Post';
import User from '../User/User';
import './Home.css';
import Loader from '../Loader/Loader';
import { Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );
  const { error: likeError, message: likeMessage } = useSelector(
    (state) => state.like
  );

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (likeError) {
      toast.error(likeError);
      dispatch({ type: 'clearErrors' });
    }
    if (likeMessage) {
      toast.success(likeMessage);
      dispatch({ type: 'clearMessage' });
    }
    // [alert,error,message] when we use react-alert
  }, [likeError, likeMessage, error, dispatch]);
  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className='home'>
      <div className='homeleft'>
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
            />
          ))
        ) : (
          <Typography variant='h6'>No Posts yet</Typography>
        )}
      </div>
      <div className='homeright'>
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
