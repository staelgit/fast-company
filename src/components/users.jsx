import React, { useState } from 'react';
import api from '../api';

const Users = () => {
   const [users, setUsers] = useState(api.users.fetchAll());

   const handleDelete = (userId) => {
      setUsers((prevState) => prevState.filter((user) => user._id !== userId));
   };

   const renderPhrase = (number) => {
      const classes =
         'badge m-1 ' + (number === 0 ? 'bg-danger' : 'bg-primary');
      const text =
         number === 0
            ? 'Никто с тобой не тусанет'
            : `${number} человек${
                 number === 2 || number === 3 || number === 4 ? 'a' : ''
              } тусанет с тобой сегодня`;

      return <span className={classes}>{text}</span>;
   };

   const renderQualities = (qualities) => {
      return qualities.map((quality) => (
         <span key={quality._id} className={`badge m-1 bg-${quality.color}`}>
            {quality.name}
         </span>
      ));
   };

   const renderUsers = () => {
      return users.map((user) => (
         <tr key={user._id}>
            <th scope="row">{user.name}</th>
            <td>{renderQualities(user.qualities)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
               <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
               >
                  Delete
               </button>
            </td>
         </tr>
      ));
   };

   return (
      <>
         <h2>{renderPhrase(users.length)}</h2>
         {users.length !== 0 && (
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">Имя</th>
                     <th scope="col">Качества</th>
                     <th scope="col">Профессия</th>
                     <th scope="col">Встретился, раз</th>
                     <th scope="col">Оценка</th>
                     <th scope="col"></th>
                  </tr>
               </thead>
               <tbody>{renderUsers()}</tbody>
            </table>
         )}
      </>
   );
};

export default Users;
