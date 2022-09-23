import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import Loader from '../../common/loader';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/quaitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';

const UserPage = ({ id: userId }) => {
   const [user, setUser] = useState();

   useEffect(() => {
      api.users.getById(userId).then((data) => {
         setUser(data);
      });
   }, []);
   if (user) {
      return (
         <div className="container">
            <div className="row gutters-sm">
               <div className="col-md-4 mb-3">
                  <UserCard user={user} />
                  <QualitiesCard data={user.qualities} />
                  <MeetingsCard value={user.completedMeetings} />
               </div>
               <div className="col-md-8">
                  <Comments />
               </div>
            </div>
         </div>
      );
   } else {
      return <Loader />;
   }
};

UserPage.propTypes = {
   id: PropTypes.string.isRequired
};

export default UserPage;
