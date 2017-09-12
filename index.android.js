/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import App from './src/App';
import logger from 'redux-logger'
import AppReducer from './src/reducers';
import AppWithNavigationState from './src/AppNavigator';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class Egla extends Component {
  store = createStore(
    AppReducer,
    undefined,
    compose(
      autoRehydrate(),
      devtools(
        applyMiddleware(logger)
      )
    )
  );

  componentDidMount() {
    persistStore(this.store, { storage: AsyncStorage });
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('egla', () => Egla);
