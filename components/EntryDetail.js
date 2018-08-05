import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from  'react-redux'
import { white, purple } from  '../utils/colors'
import MetricCard from './MetricCard'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import { getDailyReminderValue, timeToString } from '../utils/helpers'
import TextButton from  './TextButton'



class EntryDetail extends Component {

	static navigationOptions = ({ navigation }) => {

		const {entryId} = navigation.state.params

		const year = entryId.slice(0,4)
		const month = entryId.slice(5,7)
		const day = entryId.slice(8)

	    return {
	    	title: `${day}-${month}-${year}`,
	    	headerStyle: {
		    	backgroundColor: '#f4511e',
		    },
		    headerTintColor: '#fff',
		    headerTitleStyle: {
		    	fontWeight: 'bold',
		    },
	    }
	}

	reset = () => {
		
		const {entryId, remove, goBack} = this.props

		remove()
		goBack()
		removeEntry(entryId)

	}

	shouldComponentUpdate ( nextProps ){
		return nextProps.metrics !== null && !nextProps.metrics.today
	}

 	render(){
 		const { metrics, navigation } = this.props
 		const { entryId } = navigation.state.params

		return(
			<View style= {styles.container}>
				<MetricCard metrics={metrics} />
				<TextButton onPress={this.reset} style={styles.resetBtn}>
					RESET
				</TextButton>
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
  resetBtn: {
  	fontWeight: 'bold',
  	color:white,
  	backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function mapStateToProps (state, { navigation }) {
	const { entryId } = navigation.state.params

	return {
		entryId,
		metrics: state[entryId]
	}
	
}

function mapDispatchToPrpps (dispatch, {navigation}) {
	const { entryId } = navigation.state.params

	return{
		remove: ()=> dispatch(addEntry({
			[entryId]: timeToString() === entryId
				? getDailyReminderValue()
				: null	
		})),
		goBack : ()=> navigation.goBack()
	}
}
export default connect(mapStateToProps, mapDispatchToPrpps)(EntryDetail)


