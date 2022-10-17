import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage';
import UserProvider from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';

const Users = () => {
   const { userId, edit } = useParams();
   const { currentUser } = useAuth();

   return (
      <>
         <UserProvider>
            {userId ? (
               edit === 'edit' ? (
                  userId === currentUser._id ? (
                     <EditUserPage />
                  ) : (
                     <Redirect to={`/users/${currentUser._id}/edit`} />
                  )
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
