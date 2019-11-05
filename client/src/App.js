import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import SocketProvider from './context/socket';
import NotificationProvider from './context/notification';
import Login from './pages/login';
import './styles.scss';

const Game = React.lazy(() =>
  import(/* webpackPrefetch: true */ './pages/game')
);

function App() {
  return (
    <SocketProvider>
      <NotificationProvider>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to={{ pathname: '/login' }} />}
              />
              <Route path="/login" component={Login} />
              <Route path="/game" component={Game} />
            </Switch>
          </Router>
        </React.Suspense>
      </NotificationProvider>
    </SocketProvider>
  );
}

export default App;
