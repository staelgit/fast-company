import React, { useState } from 'react';
import Users from './app/components/users';

import api from './app/api';

const App = () => {
   const [users, setUsers] = useState(api.users.fetchAll());

   const handleDelete = (userId) => {
      setUsers((prevState) => prevState.filter((user) => user._id !== userId));
   };

   const handleToggleBookmark = (userId) => {
      // TODO разобраться почему не работает prevState
      const newUsersState = users.map((user) => {
         if (user._id === userId) user.bookmark = !user.bookmark;
         return user;
      });
      setUsers(newUsersState);
   };

   return (
      <>
         <Users
            onHandleDelete={handleDelete}
            onHandleToggleBookmark={handleToggleBookmark}
            users={users}
         />
      </>
   );
};

export default App;
