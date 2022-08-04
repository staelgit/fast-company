import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({ data, columns }) => {
   const renderContent = (column, item) => {
      if (columns[column].component) {
         const component = columns[column].component;
         if (typeof component === 'function') {
            return component(item);
         }
         return component;
      }
      return _.get(item, columns[column].path);
   };
   return (
      <tbody>
         {data.map((item) => (
            <tr key={item._id}>
               {Object.keys(columns).map((column) => (
                  <td key={column}>{renderContent(column, item)}</td>
               ))}
            </tr>
         ))}
      </tbody>
   );
};

TableBody.propTypes = {
   data: PropTypes.arrayOf(
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

export default TableBody;
