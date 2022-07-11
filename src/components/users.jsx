import React, { useState } from 'react';
import api from '../api';
import declOfNum from '../lib/decl_Of_Num';

const Users = () => {
   const [users, setUsers] = useState(api.users.fetchAll());

   const handleDelete = (userId) => {
      setUsers((prevState) => prevState.filter((user) => user._id !== userId));
   };

   const renderPhrase = (number) => {
      const classes = `badge m-1 ${number === 0 ? 'bg-danger' : 'bg-primary'}`;
      const text =
         number === 0
            ? 'Никто с тобой не тусанет'
            : `${number} ${declOfNum(number, [
                 'человек тусанет',
                 'человека тусанут',
                 'человек тусанет',
              ])} с тобой сегодня`;

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
      return users.map(
         ({ _id, name, rate, completedMeetings, qualities, profession }) => (
            <tr key={_id}>
               <th scope="row">{name}</th>
               <td>{renderQualities(qualities)}</td>
               <td>{profession.name}</td>
               <td>{completedMeetings}</td>
               <td>{rate}/5</td>
               <td>
                  <button
                     type="button"
                     className="btn btn-danger btn-sm"
                     onClick={() => handleDelete(_id)}
                  >
                     Delete
                  </button>
               </td>
            </tr>
         )
      );
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
                     <th scope="col" />
                  </tr>
               </thead>
               <tbody>{renderUsers()}</tbody>
            </table>
         )}
      </>
   );
};

export default Users;
