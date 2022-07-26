import React, { useState } from 'react';
import Pagination from './pagination';
import { paginate } from '../lib/paginate';
import User from './user';
import PropTypes from 'prop-types';

const Users = ({ users, ...rest }) => {
   const count = users.length;
   const pageSize = 4;
   const [currentPage, setCurrentPage] = useState(1);

   const correctPage = Math.ceil(count / pageSize);
   if (currentPage > correctPage) {
      setCurrentPage(correctPage);
   }

   const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
   };

   const userCrop = paginate(users, currentPage, pageSize);

   return (
      <div>
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
         <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
         />
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
