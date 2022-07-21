import React from 'react';
import Quality from './quality';
import Bookmark from './bookmark';
import PropTypes from 'prop-types';

const User = ({
   _id,
   name,
   rate,
   completedMeetings,
   qualities,
   profession,
   onHandleDelete,
   ...rest
}) => {
   return (
      <tr key={_id}>
         <th scope="row">{name}</th>
         <td>
            {qualities.map((quality) => (
               <Quality key={quality._id} {...quality} />
            ))}
         </td>
         <td>{profession.name}</td>
         <td>{completedMeetings}</td>
         <td>{rate}/5</td>
         <td>
            <div className="d-flex justify-content-center">
               <Bookmark _id={_id} {...rest} />
            </div>
         </td>
         <td>
            <button
               type="button"
               className="btn btn-danger btn-sm"
               onClick={() => onHandleDelete(_id)}
            >
               Delete
            </button>
         </td>
      </tr>
   );
};

User.propTypes = {
   _id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   rate: PropTypes.number.isRequired,
   completedMeetings: PropTypes.number.isRequired,
   qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
   profession: PropTypes.objectOf(PropTypes.string).isRequired,
   onHandleDelete: PropTypes.func.isRequired
};

export default User;
