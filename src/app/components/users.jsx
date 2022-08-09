import React, { useState, useEffect } from 'react';
import api from '../api';
import _ from 'lodash';
import { paginate } from '../lib/paginate';
import Pagination from './pagination';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UserTable from './userTable';

const PAGING_SIZE = 8;

const Users = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [professions, setProfessions] = useState([]);
   const [selectedProf, setSelectedProf] = useState(null);
   const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      api.users.fetchAll().then((data) => setUsers(data));
      api.professions
         .fetchAll()
         .then((data) => setProfessions(data))
         .finally(() => setLoading(false));
   }, []);

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedProf]);

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

   const handleProfessionSelect = (item) => {
      setSelectedProf(item);
   };

   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };

   const handleSort = (item) => {
      setSortBy(item);
   };

   if (loading) return 'Loading...';

   const filteredUsers = selectedProf
      ? users.filter((user) => _.isEqual(user.profession, selectedProf))
      : users;

   const count = filteredUsers.length;

   const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

   // todo добавлено мной
   const correctPage = Math.ceil(count / PAGING_SIZE);
   if (currentPage > correctPage) {
      setCurrentPage(correctPage);
   }
   // todo добавлено мной

   const userCrop = paginate(sortedUsers, currentPage, PAGING_SIZE);

   const clearFilter = () => {
      setSelectedProf(null);
   };

   return (
      <div className="d-flex">
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

         <div className="d-flex flex-column">
            <SearchStatus length={count} />
            {count !== 0 && (
               <UserTable
                  users={userCrop}
                  selectedSort={sortBy}
                  onSort={handleSort}
                  onDelete={handleDelete}
                  onToggleBookmark={handleToggleBookmark}
               />
            )}
            <div className="d-flex justify-content-center">
               <Pagination
                  itemsCount={count}
                  pageSize={PAGING_SIZE}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
               />
            </div>
         </div>
      </div>
   );
};

export default Users;
