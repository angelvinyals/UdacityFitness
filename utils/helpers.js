import React from 'react'
import { View, StyleSheet, Text, AsyncStorage } from 'react-native'
//import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { white, red, orange,  blue, lightPurp, pink ,  gold, yellow } from './colors'
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PushNotification from  'react-native-push-notification'

const NOTIFICATION_KEY = 'UdacityFitness: notifications'


export function getDailyReminderValue () {
	return{
		today: "Don't forget to log your data today!"
	}
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})


export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}


export function getMetricMetaInfo (metric) {
	const info ={
		run:{
			displayname:'Run',
			max: 50,
			unit:'km',
			step:1,
			type: 'steppers',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: red}]}>
						<MaterialIcon
							name= 'directions-run'
							color={'black'}
							size={35}
						/>
					</View>
				)
			}
		},
		bike:{
			displayname:'Bike',
			max: 100,
			unit:'km',
			step:1,
			type: 'steppers',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: pink}]}>
						<MaterialCommunityIcon
							name= 'bike'
							color={'black'}
							size={35}
						/>
					</View>
				)
			}
		},
		swim:{
			displayname:'Swim',
			max: 9900,
			unit:'m',
			step:100,
			type: 'steppers',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: blue}]}>
						<MaterialCommunityIcon
							name= 'swim'
							color={'black'}
							size={35}
						/>
					</View>
				)
			}
		},
		sleep:{
			displayname:'Sleep',
			max: 24,
			unit:'hours',
			step:1,
			type: 'slider',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: lightPurp}]}>
						<FontAwesome
							name= 'bed'
							color={'black'}
							size={35}
						/>
					</View>
				)
			}
		},
		eat:{
			displayname:'Eat',
			max: 10,
			unit:'rating',
			step:1,
			type: 'slider',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: yellow }]}>
						<MaterialCommunityIcon
							name= 'food'
							color={'black'}
							size={35}
						/>
					</View>
				)
			}
		},

	}

	return typeof metric === 'undefined'
		? info
		: info[metric]

}

export function clearLocalNotification () {
  
}


function IdString () {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return '_' + Math.random().toString(36).substr(2, 9);
}

function createNotification () {
	return {
	  	id: IdString(),
	    title: 'Log your stats!',
	    message: "👋 don't forget to log your stats for today!",
	    playSound: true,
	    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
	    vibrate: true, // (optional) default: true
	    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
	      
	    
	      sticky: false,
	      
	    
	}
}

export function setLocalNotification () {

}
