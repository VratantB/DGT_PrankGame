import { View, StyleSheet } from 'react-native';
import { memo } from 'react';

interface NPCProps {
  type: 'boss' | 'teacher' | 'guard' | 'librarian' | 'trainer' | 'parent' | 'friend' | 'lifeguard' | 'ra' | 'chef';
  state: 'idle' | 'patrol' | 'alert' | 'writing' | 'sitting' | 'sleeping' | 'watching' | 'cooking';
}

function NPC({ type, state }: NPCProps) {
  return (
    <View style={styles.container}>
      {state === 'alert' && (
        <View style={styles.alertIcon}>
          <View style={styles.exclamation} />
        </View>
      )}

      <View style={styles.head}>
        <View style={styles.eye} />
        <View style={styles.eye} />
      </View>

      <View style={[styles.body, type === 'boss' && styles.bossSuit, type === 'teacher' && styles.teacherBody, type === 'chef' && styles.chefBody, type === 'lifeguard' && styles.lifeguardBody]} />

      {type === 'boss' && <View style={styles.tie} />}
      {type === 'chef' && <View style={styles.chefHat} />}
      {type === 'librarian' && <View style={styles.glasses} />}

      <View style={styles.visionCone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 120,
    alignItems: 'center',
  },
  alertIcon: {
    position: 'absolute',
    top: -30,
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#F44336',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  exclamation: {
    width: 4,
    height: 12,
    backgroundColor: '#F44336',
    borderRadius: 2,
  },
  head: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFCCBC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 3,
    borderColor: '#FF5722',
    marginBottom: 4,
  },
  eye: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2D3748',
  },
  body: {
    width: 36,
    height: 48,
    backgroundColor: '#9E9E9E',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#616161',
  },
  bossSuit: {
    backgroundColor: '#424242',
  },
  hoodieBody: {
    backgroundColor: '#7C3AED',
  },
  grandmaBody: {
    backgroundColor: '#EC4899',
  },
  teacherBody: {
    backgroundColor: '#3B82F6',
  },
  chefBody: {
    backgroundColor: '#FFFFFF',
  },
  lifeguardBody: {
    backgroundColor: '#EF4444',
  },
  chefHat: {
    position: 'absolute',
    top: -15,
    width: 50,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  glasses: {
    position: 'absolute',
    top: 28,
    width: 36,
    height: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
  },
  tie: {
    position: 'absolute',
    top: 52,
    width: 12,
    height: 32,
    backgroundColor: '#1976D2',
    borderRadius: 6,
  },
  visionCone: {
    position: 'absolute',
    top: 40,
    left: 50,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 60,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255, 87, 34, 0.2)',
    transform: [{ rotate: '90deg' }],
  },
});

export default memo(NPC);
