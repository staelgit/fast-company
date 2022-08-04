import React, { useState, useEffect } from 'react';
import api from '../api';
import Pagination from './pagination';
import { paginate } from '../lib/paginate';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UserTable from './userTable';
import _ from 'lodash';

const Users = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [professions, setProfessions] = useState();
   const [selectedProf, setSelectedProf] = useState();
   const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
   const pageSize = 8;

   const [users, setUsers] = useState();

   useEffect(() => {
      api.users.fetchAll().then((data) => setUsers(data));
   }, []);

   const handleDelete = (userId) => {
      setUsers((prevState) => prevState.filter((user) => user._id !== userId));
   };

   const handleToggleBookmark = (userId) => {
      const newUsersState = users.map((user) => {
         if (user._id === userId) user.bookmark = !user.bookmark;
         return user;
      });
      setUsers(newUsersState);
   };

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

   const handleSort = (item) => {
      setSortBy(item);
   };

   if (users) {
      const filteredUsers = selectedProf
         ? users.filter((user) => _.isEqual(user.profession, selectedProf))
         : users;

      const count = filteredUsers.length;

      const sortedUsers = _.orderBy(
         filteredUsers,
         [sortBy.path],
         [sortBy.order]
      );

      // todo добавлено мной
      const correctPage = Math.ceil(count / pageSize);
      if (currentPage > correctPage) {
         setCurrentPage(correctPage);
      }
      // todo добавлено мной

      const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                  <button
                     className="btn btn-secondary mt-2"
                     onClick={clearFilter}
                  >
                     Очистить фильтр
                  </button>
               </div>
            )}
            <div className="d-flex flex-column">
               <SearchStatus length={count} />
               {count !== 0 && (
                  <UserTable
                     users={userCrop}
                     selectedSort={sortBy}
                     onSort={handleSort}
                     onHandleDelete={handleDelete}
                     onHandleToggleBookmark={handleToggleBookmark}
                  />
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
   } else return 'Loading...';
};

export default Users;
