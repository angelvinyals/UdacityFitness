import React, { Component } from  'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciStepper from './UdaciStepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'
import Ionicon from 'react-native-vector-icons/Ionicons';
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white , purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'


function SubmitBtn ({ onPress }) {
	return (
		<TouchableOpacity
			style={Platform.Os === 'ios' ? styles.iosSubmitBtn: styles.androidSubmitBtn}
			onPress={onPress}
		>
				<Text style={styles.submitBtnText}>SUBMIT</Text>
		
		</TouchableOpacity>
	)
}

class AddEntry extends Component {
	state={
		run:10,
		bike:0,
		swim:10,
		sleep:0,
		eat:0,
	}

	increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric)
		console.log('passing increment')

		this.setState((state) => {
			const count = state[metric] + step

			return {
				...state,
				[metric]: count  > max ? max : count
			}
		})
	}

	decrement = (metric) => {
		const { step } = getMetricMetaInfo(metric)
		console.log('passing decrement')
		this.setState((state) =>{
			const count = state[metric] - step

			return {
				...state,
				[metric]: count  < 0 ? 0 : count
			}
		})
	}

	slide = (metric,  value) => {
		this.setState(() =>({
			[metric]:value,
		}))
	}

	submit = () => {
		const key = timeToString()
		const entry = this.state

		this.props.dispatch(addEntry({
			[key]: entry
		}))

		this.setState(()=>({
			run:0,
			bike:0,
			swim:0,
			sleep:0,
			eat:0,
		}))

		this.toHome()

		submitEntry({ key, entry})

		//clear local notification
	}

	reset = () =>{
		const key= timeToString()

		this.props.dispatch(addEntry({
			[key]: getDailyReminderValue()
		}))

		this.toHome()

		removeEntry(key)
	}

	toHome = () => {
		const backAction = NavigationActions.back({
		  key: 'AddEntry',
		})
		this.props.navigation.dispatch(backAction)
	}

	render(){
		const metaInfo = getMetricMetaInfo()

		if (this.props.alreadyLogged) {
			return(
				<View style={styles.center}>			
					<Ionicon
						name= {Platform.Os === 'ios' ? 'ios-happy-outline': 'md-happy'}S
						color={'black'}
						size={100}						
					/>	
					<Text>You already logged your information for today</Text>
					<TextButton style={{padding: 10, fontSize:30 }}onPress={this.reset}>
						reset
					</TextButton>	
				</View>
			)
		}

		return (
			<View style={styles.container}>
				
				<DateHeader date={(new Date()).toLocaleDateString()}/>
				
				{Object.keys(metaInfo).map((key) => {
					const { getIcon, type, ...rest }= metaInfo[key]
					const value = this.state[key]

					return (
						<View key={key} style= {styles.row}>
							{getIcon()}
							{type === 'slider' 
								? <UdaciSlider 
									value={value}
									onChange={(value) => this.slide(key,value)}
									{...rest}
									/>
								: <UdaciStepper
									value={value}
									onIncrement= {() => this.increment(key)}
									onDecrement = {() => this.decrement(key)}
									{...rest}
								/>
							}
						</View>
					)
				})}
				<SubmitBtn onPress={this.submit} style={styles.submitBtnText}/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})


function mapStateToProps (state) {
	const key = timeToString()

	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}
	
}
export default connect(mapStateToProps)(AddEntry)
