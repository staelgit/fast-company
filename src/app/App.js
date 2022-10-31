import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
   return (
      <div className="p-2">
         <AppLoader>
            <NavBar />
            <Switch>
               <ProtectedRoute
                  path="/users/:userId?/:edit?"
                  component={Users}
               />
               <Route path="/login/:type?" component={Login} />
               <Route path="/logout" component={LogOut} />
               <Route exact path="/" component={Main} />
               <Redirect to="/" />
            </Switch>
         </AppLoader>
         <ToastContainer />
      </div>
   );
};

export default App;
