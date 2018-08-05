import React, {Component} from 'react';
import { View, Platform , StatusBar} from 'react-native';
import {createStore } from 'redux'
import { Provider } from  'react-redux'
import reducer from './reducers'
import History from './components/History'
import AddEntry from './components/AddEntry'
import { createBottomTabNavigator } from 'react-navigation';
import { white , purple } from './utils/colors'
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View sytle={{backgroundColor, height: 50}}> 
      <StatusBar translucent backgroundColor={backgroundColor} {...props} /> 
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor} ) =><Ionicon name='md-bookmark' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor} ) =><FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})


export default class App extends Component<Props> {
  render() {
    return (
      <Provider store= {createStore(reducer)}>          
        <View style= {{flex:1}}>
          <View style= {{height:20}}/>
            <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
            <Tabs />
        </View>
      </Provider>
    )
  }
}
