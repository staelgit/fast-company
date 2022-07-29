import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import { paginate } from '../lib/paginate';
import User from './user';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import api from '../api';
import SearchStatus from './searchStatus';

const Users = ({ users: allUsers, ...rest }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [professions, setProfessions] = useState();
   const [selectedProf, setSelectedProf] = useState();

   const pageSize = 4;

   useEffect(() => {
      api.professions.fetchAll().then((data) => setProfessions(data));
   }, []);

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedProf]);

   const handleProfessionSelect = (item) => {
      setSelectedProf(item);
   };

   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };

   const filteredUsers = selectedProf
      ? allUsers.filter((user) => user.profession === selectedProf)
      : allUsers;

   const count = filteredUsers.length;

   // todo добавлено мной
   const correctPage = Math.ceil(count / pageSize);
   if (currentPage > correctPage) {
      setCurrentPage(correctPage);
   }
   // todo добавлено мной

   const userCrop = paginate(filteredUsers, currentPage, pageSize);

   const clearFilter = () => {
      setSelectedProf(undefined);
   };

   return (
      <div className="d-flex">
         {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
               <GroupList
                  selectedItem={selectedProf}
                  items={professions}
                  onItemSelect={handleProfessionSelect}
               />
               <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                  Очистить фильтр
               </button>
            </div>
         )}
         <div className="d-flex flex-column">
            <SearchStatus length={count} />
            {count !== 0 && (
               <table className="table">
                  <thead>
                     <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col" />
                     </tr>
                  </thead>
                  <tbody>
                     {userCrop.map((user) => (
                        <User key={user._id} {...user} {...rest} />
                     ))}
                  </tbody>
               </table>
            )}
            <div className="d-flex justify-content-center">
               <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
               />
            </div>
         </div>
      </div>
   );
};

Users.propTypes = {
   users: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string,
         name: PropTypes.string,
         bookmark: PropTypes.bool,
         rate: PropTypes.number,
         completedMeetings: PropTypes.number,
         qualities: PropTypes.arrayOf(
            PropTypes.shape({
               _id: PropTypes.string,
               color: PropTypes.string,
               name: PropTypes.string
            })
         ),
         profession: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
         }),
         onHandleDelete: PropTypes.func,
         onHandleToggleBookmark: PropTypes.func
      })
   ).isRequired
};

export default Users;
