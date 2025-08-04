import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressIndicator = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  const targetProgress = Math.min(currentStep / totalSteps, 1);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: targetProgress,
      duration: 300, // smooth transition
      useNativeDriver: false, // flex/width cannot use native driver
    }).start();
  }, [targetProgress]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, { width: animatedWidth }]} />
    </View>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({
  container: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    marginVertical: 10,
    width: '100%',
  },
  progress: {
    height: '100%',
    backgroundColor: '#94abfe',
  },
});
