import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DataHeader from  './DataHeader'
import { getMetricMetaInfo} from  '../utils/helpers'
import { gray } from '../utils/colors'

export default function MetricCard ({ date, metrics}) {
	console.log('date', date)
	console.log('metrics', metrics)
	return(
		<View>
			{date && <DataHeader date={date} />}
			{Object.keys(metrics).map((metric) =>{
				const{ getIcon, displayName, unit,  backgroundColor } = getMetricMetaInfo(metric)
				return(
					<View style={styles.metric} key={metric}>
						<View style={styles.metric} key={metric}>
							{getIcon()}
							<Text style={{fontSize: 20}}>
								{displayName}
							</Text>
							<Text style={{fontSize: 20}}>
								{metrics[metric]} {unit}
							</Text>

						</View>
					</View>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	metric: {
		flexDirection: 'row',
		marginTop: 12,

	}
})