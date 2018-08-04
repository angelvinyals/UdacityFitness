import React, { Component } from  'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { white, gray, purple } from '../utils/colors'

export default function UdaciSlider ({value, onIncrement,  onDecrement, ...rest}) {
	const {displayname, max,  step,  unit} = rest
	return(
		<View style= {[styles.row, {justifyContent: 'space-between'}]}>	
			
		    	{Platform.OS === 'ios'
		    		? <View style= {{flexDirection: 'row'}}>	
		    			<TouchableOpacity 
							onPress={onDecrement}
							style={[styles.iosBtn, {borderTopLeftRadius:0, borderBottomLeftRadius: 0}]}
				       	>
							<MaterialCommunityIcon
								name= 'minus'
								color={purple}
								size={25}
								onPress={onDecrement}
							/>
						</TouchableOpacity>
						<TouchableOpacity 
				       		onPress={onIncrement}
				       		style={[styles.iosBtn, {borderTopRightRadius:0, borderBottomRightRadius: 0}]}
				       	>
							<MaterialCommunityIcon
								name= 'plus'
								color={purple}
								size={25}
								onPress={onIncrement}
							/>
						</TouchableOpacity>
					</View>
					: <View style= {{flexDirection: 'row'}}>	
		    			<TouchableOpacity 
							onPress={onDecrement}
							style={styles.androidBtn}
				       	>
							<MaterialCommunityIcon
								name= 'minus'
								color={white}
								size={25}
								onPress={onDecrement}
							/>
						</TouchableOpacity>
						<TouchableOpacity 
				       		onPress={onIncrement}
				       		style={styles.androidBtn}
				       	>
							<MaterialCommunityIcon
								name= 'plus'
								color={white}
								size={25}
								onPress={onIncrement}
							/>
						</TouchableOpacity>
					</View>
		    	}   	
				
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
