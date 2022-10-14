import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './app/components/ui/navBar';
import Login from './app/layouts/login';
import Main from './app/layouts/main';
import Users from './app/layouts/users';
import { ProfessionProvider } from './app/hooks/useProfession';
import { QualitiesProvider } from './app/hooks/useQualities';
import AuthProvider from './app/hooks/useAuth';
import ProtectedRoute from './app/components/common/protectedRoute';
import LogOut from './app/layouts/logOut';

const App = () => {
   return (
      <div className="p-2">
         <AuthProvider>
            <NavBar />
            <QualitiesProvider>
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
            </QualitiesProvider>
         </AuthProvider>
         <ToastContainer />
      </div>
   );
};

export default App;
