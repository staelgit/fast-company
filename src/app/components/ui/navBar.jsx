import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
   return (
      <nav className="nav nav-tabs mb-2">
         <NavLink exact className="nav-link" to="/">
            Main
         </NavLink>
         <NavLink className="nav-link" to="/login">
            Login
         </NavLink>
         <NavLink className="nav-link" to="/users">
            Users
         </NavLink>
      </nav>
   );
};

export default NavBar;
