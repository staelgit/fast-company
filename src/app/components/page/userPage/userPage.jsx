import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../../api';
import Qualities from '../../ui/qualities';
import Loader from '../../common/loader';

const UserPage = ({ id }) => {
   const [user, setUser] = useState({});
   const history = useHistory();

   useEffect(() => {
      api.users.getById(id).then((data) => {
         setUser(data);
      });
   }, []);

   const handleClick = () => {
      history.push(`/users/${id}/edit`);
   };

   if (!user || !Object.keys(user).length) return <Loader />;

   return (
      <>
         <h2>Данные пользователя:</h2>
         <table className="table table-striped d-inline-block">
            <tbody>
               <tr>
                  <th scope="row">Имя</th>
                  <td>{user.name}</td>
               </tr>
               <tr>
                  <th scope="row">Профессия</th>
                  <td>{user.profession.name}</td>
               </tr>
               <tr>
                  <th scope="row">Качества</th>
                  <td>
                     <Qualities qualities={user.qualities} />
                  </td>
               </tr>
               <tr>
                  <th scope="row">Встретился, раз</th>
                  <td>{user.completedMeetings}</td>
               </tr>
               <tr>
                  <th scope="row">Оценка</th>
                  <td>{user.rate}</td>
               </tr>
            </tbody>
         </table>
         <button onClick={handleClick}>Изменить</button>
      </>
   );
};

UserPage.propTypes = {
   id: PropTypes.string.isRequired
};

export default UserPage;
