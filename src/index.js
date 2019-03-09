import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Spin } from 'antd';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './config/store';
import RootRouter from './config/rootRouter';
import 'antd/dist/antd.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spin tip="Loading..." />} persistor={persistor}>
      <RootRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
