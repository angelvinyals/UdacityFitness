import React, { Component } from  'react'
import { View, Text, StyleSheet, Slider } from 'react-native'
import { white, gray, purple } from '../utils/colors'


export default function UdaciSlider ({value,onChange,...rest}) {
	const {displayname, max,  step,  unit} = rest
	return(
		<View style= {[styles.row, {justifyContent: 'space-between'}]}>	
			<Slider
				style={{flex:1}}
				minimumValue= {0}
				maximumValue={max}
				step= {step}
				value={value}
				onValueChange={onChange}
			/>
			<View  style= {styles.metricCounter}>
	        	<Text style={{fontSize:24, textAlign:'center'}}>{value}</Text>
				<Text style={{fontSize:18, color:gray}}>{unit}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginLeft:10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
})


