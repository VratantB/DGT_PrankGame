import { View, Text, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

interface DetectionMeterProps {
  level: number;
}

export default function DetectionMeter({ level }: DetectionMeterProps) {
  const animatedWidth = useRef(new Animated.Value(level)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: level,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [level, animatedWidth]);

  const getColor = () => {
    if (level < 30) return '#10B981';
    if (level < 60) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusText = () => {
    if (level < 30) return 'SAFE';
    if (level < 60) return 'CAREFUL';
    if (level < 90) return 'DANGER';
    return 'DETECTED!';
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>DETECTION</Text>
        <Text style={[styles.status, { color: getColor() }]}>
          {getStatusText()}
        </Text>
      </View>
      <View style={styles.meterContainer}>
        <View style={styles.meterBackground}>
          <Animated.View
            style={[
              styles.meterFill,
              {
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getColor(),
              },
            ]}
          />
        </View>
        <View style={styles.meterMarkers}>
          <View style={styles.marker} />
          <View style={styles.marker} />
          <View style={styles.marker} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 1,
  },
  status: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  meterContainer: {
    position: 'relative',
  },
  meterBackground: {
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  meterFill: {
    height: '100%',
    borderRadius: 10,
  },
  meterMarkers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: '25%',
  },
  marker: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
