import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BottomNavigation from './components/BottomNavigation';
import Header from './components/Header';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
        </Switch>
        <BottomNavigation />
      </div>
    </Router>
  );
};

export default App;