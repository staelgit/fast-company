import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './app/components/ui/navBar';
import Login from './app/layouts/login';
import Main from './app/layouts/main';
import Users from './app/layouts/users';

const App = () => {
   return (
      <div className="p-2">
         <NavBar />
         <Switch>
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route exact path="/" component={Main} />
            <Redirect to="/" />
         </Switch>
      </div>
   );
};

export default App;
