import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import MainContainer from '../components/MainContainer';

function RootRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={MainContainer} />
        <Route path="/test" render={() => <div>test</div>} />
      </Switch>
    </Router>
  );
}

export default RootRouter;
