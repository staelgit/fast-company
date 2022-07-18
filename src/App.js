import React, { useState } from 'react';
import Users from './app/components/users';
import SearchStatus from './app/components/searchStatus';
import api from './app/api';

const App = () => {
   const [users, setUsers] = useState(api.users.fetchAll());

   const handleDelete = (userId) => {
      setUsers((prevState) => prevState.filter((user) => user._id !== userId));
   };

   const handleToggleBookmark = (userId) => {
      /*      const newUsersState = users.map((user) => {
         if (user._id === userId) user.bookmark = !user.bookmark;
         return user;
      });
      setUsers(newUsersState);*/

      //TODO разобраться почему не работает prevState
      // ------------ это не работает ---------------
      setUsers((prevState) =>
         prevState.map((u) => {
            if (u._id === userId) u.bookmark = !u.bookmark;
            return u;
         })
      );
      // ------------ /это не работает ---------------
   };

   return (
      <>
         <SearchStatus length={users.length} />
         <Users
            onHandleDelete={handleDelete}
            onHandleToggleBookmark={handleToggleBookmark}
            users={users}
         />
      </>
   );
};

export default App;
