import React, { useEffect } from 'react';
import Loader from '../components/common/loader';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/users';

const LogOut = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(logOut());
   }, []);

   return <Loader />;
};

export default LogOut;
