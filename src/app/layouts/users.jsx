import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage';

const Users = () => {
   const { userId, edit } = useParams();
   if (!userId) {
      return <UsersListPage />;
   } else if (edit === 'edit') {
      return <EditUserPage id={userId} />;
   } else {
      return <UserPage id={userId} />;
   }
};

export default Users;
