import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import Loader from '../components/common/loader';

const UserContext = React.createContext();

export const useUser = () => {
   return useContext(UserContext);
};

const UserProvider = ({ children }) => {
   const [users, setUsers] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      gerUsers();
   }, []);

   useEffect(() => {
      if (error !== null) {
         toast(error);
         setError(null);
      }
   }, [error]);

   async function gerUsers() {
      try {
         const { content } = await userService.get();
         setUsers(content);
         setIsLoading(false);
      } catch (error) {
         errorCatcher(error);
      }
   }

   function errorCatcher(error) {
      const { message } = error.response.data;
      setError(message);
      setIsLoading(false);
   }

   return (
      <UserContext.Provider value={{ users }}>
         {!isLoading ? children : <Loader />}
      </UserContext.Provider>
   );
};

UserProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ])
};

export default UserProvider;
