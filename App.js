import React, {Component} from 'react';
import { View} from 'react-native';
import {createStore } from 'redux'
import { Provider } from  'react-redux'
import reducer from './reducers'
import History from './components/History'


export default class App extends Component<Props> {
  render() {
    return (
      <Provider store= {createStore(reducer)}>          
        <View style= {{flex:1}}>
          <View style= {{height:20}}/>
          <History/>          
        </View>
      </Provider>
    )
  }
}
