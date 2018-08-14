import React, { Component } from 'react'
import { View, Text, Switch, StyleSheet} from 'react-native'
import Permissions from 'react-native-permissions'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box"


class GeolocationExample extends Component {
   state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
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

                this.setState(()=>({ status: response}))
         })
         .catch((error) =>{
            console.log('error getting Location permission:', error)

            this.setState(() =>({status: 'undetermined'}))
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
         return this.setLocation()
      }).catch((error) => {
            console.log(error.message);
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
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const initialPosition = JSON.stringify(position);
            this.setState({ initialPosition });
         },
         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
         const lastPosition = JSON.stringify(position);
         this.setState({ lastPosition });
      });
   }
   
   render() {
      return (
         <View style = {styles.container}>
            <Text style = {styles.boldText}>
               Initial position:
            </Text>
				
            <Text>
               {this.state.initialPosition}
            </Text>

            <Text style = {styles.boldText}>
               Current position:
            </Text>
				
            <Text>
               {this.state.lastPosition}
            </Text>
         </View>
      )
   }
}
export default GeolocationExample

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   boldText: {
      fontSize: 30,
      color: 'red',
   }
})