import React, { Component } from 'react'
import { View, Text, ActivityIndicator,TouchableOpacity, StyleSheet, Platform, PermissionsAndroid, Animated} from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { white , purple } from '../utils/colors'
import Permissions from 'react-native-permissions'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box"
import { calculateDirection } from '../utils/helpers'

export default class Live extends Component {
	state= {
		enabled: null,
		coords: {
			altitude:-1,
			speed: -1
		},
		status: null,
		direction: '',
		bounceValue: new Animated.Value(1)
	}

	watchID: ?number = null;

	componentDidMount = () => {
      Permissions.check('location')
         .then(response => {
            console.log('status after response:', response)
             // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
             this.setState({ status: response})
             if (response === 'authorized'){
               console.log('status :',response)
               return this.LocationServiceIsEnable()
             }
         })
         .catch((error) =>{
            console.log('error getting Location permission:', error)
         })
      
    }
    componentWillUnmount = () => {
    	navigator.geolocation.clearWatch(this.watchID);
      	// used only when "providerListener" is enabled
      	LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
   	}

   	LocationServiceIsEnable = () => {
      	LocationServicesDialogBox.checkLocationServicesIsEnabled({
        	message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
         	ok: "YES",
         	cancel: "NO",
         	enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
         	showDialog: true, // false => Opens the Location access page directly
         	openLocationServices: true, // false => Directly catch method is called if location services are turned off
         	preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
         	preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
         	providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
      	}).then(success => {
         	// success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
         	console.log('is Enabled?: ', JSON.stringify(success))
         	this.setState(() =>({enabled: success.enabled}))
         	return this.setLocation()
      	}).catch((error) => {
            console.log( 'Location Services Dialog Box launch an error: ',error.message);
      	});
        
      	DeviceEventEmitter.addListener('locationProviderStatusChange', 
         	(status) => { 
            	// only trigger when "providerListener" is enabled
            	console.log(status); 
            	//  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        	}
      	);
  	}
	
	
	setLocation = () => {
		console.log ('...inside setLocation')
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
         		const lastPosition = JSON.stringify(position);
         		console.log('lastPosition = ',lastPosition)
         		this.setState({ lastPosition });
      	})
      	this.watchID = navigator.geolocation.watchPosition(
      		position => {
		        const lastPosition = JSON.stringify(position);
		        console.log('lastPosition = ',lastPosition);
		        console.log('coords: ', position.coords)

		        const newDirection=  calculateDirection(position.coords.heading)
		        const {direction, bounceValue} = this.state

		        if(newDirection !== direction) {
		        	Animated.sequence([
		        		Animated.timing(bounceValue, {
					      duration: 200,
					      toValue: 1.04,
					    }),
					    Animated.spring(bounceValue, {
					      toValue: 1, // return to start
					      friction:4
					    }),
		        	]).start(); // start the sequence group
		        }

		        this.setState(()=> ({
		        	coords: position.coords,
		        	direction: newDirection,
		        }))
		        
		    });		
	}
  
	componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID);
   }

	render(){

		const { status, coords,  direction, bounceValue } = this.state
		
		if (status === null) {
			console.log('... begin if status = null')
			return <ActivityIndicator style={{marginTop: 30}} />
		}

		if (status === 'denied') {
			console.log('... begin if status = denied')
			return (
				<View style={styles.center}>
					<MaterialCommunityIcon
						name='alert' 
						color={purple}
						size={50}
					 />
					<Text>
						You denied your location. You can fix this by visiting your settings and enabling location services for this app.
				    </Text>
				</View>
		    )
	    }

		if (status === 'undetermined') {
			console.log('... begin if status = undetermined')
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
					<TouchableOpacity onPress={this.requestLocationPermission} style={styles.button}>
			        	<Text style={styles.buttonText}>
			        		Enable			        	
			        	</Text>
			        </TouchableOpacity>
				</View>
			)
		}

		console.log('... begin if status = authorized')

		return(
			<View style={styles.container}>
				<View style={styles.directionContainer}>
		        	<Text style={styles.header}>You're heading</Text>
		        	<Text style={styles.direction}>
		            	North
		        	</Text>
		        </View>
		        <View style={styles.metricContainer}>
		        	<View style={styles.metric}>
		            	<Text style={[styles.header, {color: white}]}>
		              		Altitude
		            	</Text>
		            	<Text style={[styles.subHeader, {color: white}]}>
		              		{Math.round(coords.altitude)} meters
		            	</Text>
		          	</View>
		          	<View style={styles.metric}>
		            	<Text style={[styles.header, {color: white}]}>
		              		Speed
		            	</Text>
		            	<Animated.Text 
		            		style={[styles.subHeader, {color: white, transform:[{scale: bounceValue}] }]}>
		              		{coords.speed} m/s
		            	</Animated.Text>
		          	</View>
		        </View>
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
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },

})