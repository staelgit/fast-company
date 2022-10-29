import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UserTable from '../../ui/userTable';
import Search from '../../ui/search';
import { useSelector } from 'react-redux';
import {
   getProfessions,
   getProfessionsLoadingStatus
} from '../../../store/professions';
import { getCurrentUserId, getUsers } from '../../../store/users';

const PAGING_SIZE = 8;

const UsersListPage = () => {
   const users = useSelector(getUsers());
   const currentUserId = useSelector(getCurrentUserId());
   const professions = useSelector(getProfessions());
   const professionsLoading = useSelector(getProfessionsLoadingStatus());
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedProf, setSelectedProf] = useState(null);
   const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
   const [searchBy, setSearchBy] = useState('');
   useEffect(() => {
      setCurrentPage(1);
      if (searchBy && selectedProf) {
         setSearchBy('');
      }
   }, [selectedProf]);

   useEffect(() => {
      if (searchBy && selectedProf) {
         setSelectedProf(null);
      }
   }, [searchBy]);

   const handleDelete = (userId) => {
      console.log(userId);
   };
   const handleToggleBookmark = (userId) => {
      const newUsersState = users.map((user) => {
         if (user._id === userId) user.bookmark = !user.bookmark;
         return user;
      });
      console.log(newUsersState);
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

   const handleSearch = (searchQuery) => {
      setSearchBy(searchQuery);
   };

   function filterUsers(data) {
      const filteredUsers =
         (selectedProf &&
            data.filter((user) => _.isEqual(user.profession, selectedProf))) ||
         (searchBy &&
            data.filter(({ name }) =>
               name.toLowerCase().includes(searchBy.toLowerCase())
            )) ||
         data;
      return filteredUsers.filter((user) => user._id !== currentUserId);
   }

   const filteredUsers = filterUsers(users);

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
      <div className="d-flex container-lg">
         {professions && !professionsLoading && (
            <div className="d-flex flex-column flex-shrink-0 pe-3">
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

         <div className="d-flex flex-column flex-grow-1">
            <SearchStatus length={count} />
            <Search onHandleSearch={handleSearch} value={searchBy} />
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

export default UsersListPage;
