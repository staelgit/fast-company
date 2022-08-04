import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UserTable = ({
   users,
   onHandleDelete,
   onSort,
   selectedSort,
   ...rest
}) => {
   const columns = {
      name: { path: 'name', name: 'Имя' },
      qualities: {
         name: 'Качества',
         component: (user) => <QualitiesList qualities={user.qualities} />
      },
      profession: { path: 'profession.name', name: 'Профессия' },
      completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
      rate: { path: 'rate', name: 'Оценка' },
      bookmark: {
         path: 'bookmark',
         name: 'Избранное',
         component: (user) => (
            <Bookmark bookmark={user.bookmark} _id={user._id} {...rest} />
         )
      },
      delete: {
         component: (user) => (
            <button
               type="button"
               className="btn btn-danger btn-sm"
               onClick={() => onHandleDelete(user._id)}
            >
               Delete
            </button>
         )
      }
   };
   return (
      <Table {...{ onSort, selectedSort, columns, data: users, ...rest }} />
   );
};

UserTable.propTypes = {
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
   ).isRequired,
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.shape({
      path: PropTypes.string,
      order: PropTypes.string
   }).isRequired,
   onHandleDelete: PropTypes.func.isRequired
};

export default UserTable;
