import * as redux from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas/rootSaga';

const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
const store: Store = redux.createStore(
  rootReducer,
  composeEnhancers(redux.applyMiddleware(...middleware)),
);
sagaMiddleware.run(rootSaga);
export default store;
