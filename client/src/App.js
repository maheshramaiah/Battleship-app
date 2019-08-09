import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import SocketProvider from './context/socket';
import NotificationProvider from './context/notification';
import history from './history';
import Login from './pages/login';
import Game from './pages/game';
import './styles.scss';

function App() {
  return (
    <SocketProvider>
      <NotificationProvider>
        <Router history={history}>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={{ pathname: '/login' }} />} />
            <Route path='/login' component={Login} />
            <Route path='/game' component={Game} />
          </Switch>
        </Router>
      </NotificationProvider>
    </SocketProvider>
  );
}

export default App;