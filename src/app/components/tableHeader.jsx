import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
   const handleSort = (item) => {
      if (selectedSort.path === item) {
         onSort({
            ...selectedSort,
            order: selectedSort.order === 'asc' ? 'desc' : 'asc'
         });
      } else {
         onSort({ path: item, order: 'asc' });
      }
   };

   return (
      <thead>
         <tr>
            {Object.keys(columns).map((column) => (
               <th
                  key={column}
                  onClick={
                     columns[column].path
                        ? () => handleSort(columns[column].path)
                        : undefined
                  }
                  {...{ role: columns[column].path && 'button' }}
                  scope="col"
               >
                  {columns[column].name}
               </th>
            ))}
            {/* <th onClick={() => handleSort('name')} role="button" scope="col">
               Имя
            </th>
            <th scope="col">Качества</th>
            <th
               onClick={() => handleSort('profession.name')}
               role="button"
               scope="col"
            >
               Профессия
            </th>
            <th
               onClick={() => handleSort('completedMeetings')}
               role="button"
               scope="col"
            >
               Встретился, раз
            </th>
            <th onClick={() => handleSort('rate')} role="button" scope="col">
               Оценка
            </th>
            <th
               onClick={() => handleSort('bookmark')}
               role="button"
               scope="col"
            >
               Избранное
            </th>
            <th scope="col" /> */}
         </tr>
      </thead>
   );
};

TableHeader.propTypes = {
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.shape({
      path: PropTypes.string,
      order: PropTypes.string
   }).isRequired,
   columns: PropTypes.shape({
      name: PropTypes.shape({ path: PropTypes.string, name: PropTypes.string }),
      qualities: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      profession: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      completedMeetings: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      rate: PropTypes.shape({ path: PropTypes.string, name: PropTypes.string }),
      bookmark: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      delete: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      })
   }).isRequired
};

export default TableHeader;
