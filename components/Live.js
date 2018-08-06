import React, { Component } from 'react'
import { View, Text, ActivityIndicator,TouchableOpacity, StyleSheet } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { white , purple } from '../utils/colors'

export default class Live extends Component {
	state= {
		coords: null,
		status: 'undetermined',
		direction: '',
	}

	askPermission = () =>{

	}

	render(){

		const { status, coords,  direction } = this.state
		
		if (status === null) {
			return <ActivityIndicator style={{marginTop: 30}} />
		}

		if (status === 'denied') {
			return (
				<View style={styles.center}>
					<Text>
						denied
					</Text>
				</View>
			)
		}

		if (status === 'undetermined') {
			return (
				<View style={styles.center}>
					<MaterialCommunityIcon
						name='alert' 
						color={purple}
						size={50}
					 />
					<Text>
						You need to enable location services for this app.
					</Text>
					<TouchableOpacity onPress={this.askPermission} style={styles.button}>
			        	<Text style={styles.buttonText}>
			        		Enable			        	
			        	</Text>
			        </TouchableOpacity>
				</View>
			)
		}

		return(
			<View>
				<Text>Live</Text>
				<Text>{JSON.stringify(this.state)}</Text>
			</View>			
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  }
})