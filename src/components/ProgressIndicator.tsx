import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ProgressIndicator = ({currentStep, totalSteps}:{currentStep: number, totalSteps: Number}) => {


  return (
    <View style={styles.container}>
       
        <View style={styles.progressBar}>
            <View
            style={[
                styles.progressFill,
                { width: `${(currentStep / totalSteps) * 100}%` },
            ]}
            />
        </View>
        <Text style={{ fontSize: 14, marginTop: 10 }}>
            {Math.round((currentStep / totalSteps) * 100)}% Complete
        </Text>
    </View>
  )
}

export default ProgressIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0df',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b5998',
    width: '50%', // This should be dynamically set based on progress
  },
});