import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import {
  AiOutlinePlusCircle,
  AiFillPlusCircle,
  AiFillHome,
  AiOutlineHome,
} from 'react-icons/ai';
import {
  RiSearchLine,
  RiSearchFill,
  RiAccountPinCircleFill,
  RiAccountPinCircleLine,
} from 'react-icons/ri';

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className='header'>
      <Link to='/' onClick={() => setTab('/')}>
        {tab === '/' ? (
          <AiFillHome style={{ color: 'black' }} />
        ) : (
          <AiOutlineHome />
        )}
      </Link>
      <Link to='/newpost' onClick={() => setTab('/newpost')}>
        {tab === '/newpost' ? (
          <AiFillPlusCircle style={{ color: 'black' }} />
        ) : (
          <AiOutlinePlusCircle />
        )}
      </Link>
      <Link to='/search' onClick={() => setTab('/search')}>
        {tab === '/search' ? (
          <RiSearchFill style={{ color: 'black' }} />
        ) : (
          <RiSearchLine />
        )}
      </Link>
      <Link to='/account' onClick={() => setTab('/account')}>
        {tab === '/account' ? (
          <RiAccountPinCircleFill style={{ color: 'black' }} />
        ) : (
          <RiAccountPinCircleLine />
        )}
      </Link>
    </div>
  );
};

export default Header;
