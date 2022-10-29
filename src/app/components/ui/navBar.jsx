import React from 'react';
import { NavLink } from 'react-router-dom';
import NavProfile from './navProfile';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users';

const NavBar = () => {
   const isLoggedIn = useSelector(getIsLoggedIn());
   return (
      <nav className="navbar bg-light mb-3">
         <div className="container-fluid">
            <ul className="nav ">
               <li className="nav-item">
                  <NavLink
                     exact
                     className="nav-link"
                     aria-current="page"
                     to="/"
                  >
                     Main
                  </NavLink>
               </li>

               {isLoggedIn && (
                  <li className="nav-item">
                     <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/users"
                     >
                        Users
                     </NavLink>
                  </li>
               )}
            </ul>

            <div className="d-flex">
               {isLoggedIn ? (
                  <NavProfile />
               ) : (
                  <NavLink className="nav-link" aria-current="page" to="/login">
                     Login
                  </NavLink>
               )}
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
