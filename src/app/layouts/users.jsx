import React from 'react';
import { useParams } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage';
import UserProvider from '../hooks/useUsers';

const Users = () => {
   const { userId, edit } = useParams();

   return (
      <>
         <UserProvider>
            {userId ? (
               edit === 'edit' ? (
                  <EditUserPage id={userId} />
               ) : (
                  <UserPage id={userId} />
               )
            ) : (
               <UsersListPage />
            )}
         </UserProvider>
      </>
   );
};

export default Users;
