import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './redux/reducers'
const store=createStore(rootReducer,composeWithDevTools());
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    )
  }
}
