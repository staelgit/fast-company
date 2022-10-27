import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './app/components/ui/navBar';
import Login from './app/layouts/login';
import Main from './app/layouts/main';
import Users from './app/layouts/users';
import { ProfessionProvider } from './app/hooks/useProfession';
import AuthProvider from './app/hooks/useAuth';
import ProtectedRoute from './app/components/common/protectedRoute';
import LogOut from './app/layouts/logOut';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './app/store/qualities';

const App = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(loadQualitiesList());
   }, []);
   return (
      <div className="p-2">
         <AuthProvider>
            <NavBar />
            <ProfessionProvider>
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
            </ProfessionProvider>
         </AuthProvider>
         <ToastContainer />
      </div>
   );
};

export default App;
