import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const NavProfile = (props) => {
   const { currentUser } = useAuth();
   const [isOpen, setIsOpen] = useState(false);
   const toggleMenu = () => {
      setIsOpen((prevState) => !prevState);
   };
   return (
      <div className="dropdown" onClick={toggleMenu}>
         <div className="btn dropdown-toggle d-flex align-items-center">
            <div className="me-2">{currentUser.name}</div>
            <img
               src={currentUser.image}
               className="img-responsive rounded-circle"
               alt="avatar"
               width="40"
               height="40"
            />
         </div>
         <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
            <Link to={`/users/${currentUser._id}`} className="dropdown-item">
               Profile
            </Link>
            <Link to="/logout" className="dropdown-item">
               Log Out
            </Link>
         </div>
      </div>
   );
};

export default NavProfile;
