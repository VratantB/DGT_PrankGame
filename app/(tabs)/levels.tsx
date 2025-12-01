import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Lock, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLevelProgress } from '@/hooks/useLevelProgress';

const LEVEL_DATA = [
  { id: 1, name: 'Ketchup Ambush', location: 'Office' },
  { id: 2, name: 'Fake Rat', location: 'Kitchen' },
  { id: 3, name: 'Disappearing Ink Pen', location: 'Classroom' },
  { id: 4, name: 'Jump-Scare Snake', location: 'Living Room' },
  { id: 5, name: 'Alarm Clock Chaos', location: 'Bedroom' },
  { id: 6, name: 'Water Balloon Drop', location: 'Balcony' },
  { id: 7, name: 'Fake Call', location: 'Office' },
  { id: 8, name: 'Spray Foam Explosion', location: 'Garage' },
  { id: 9, name: 'Swap Salt & Sugar', location: 'Kitchen' },
  { id: 10, name: 'Confetti Bomb', location: 'School' },
];

export default function LevelsScreen() {
  const router = useRouter();
  const { progress, loading, isLevelUnlocked } = useLevelProgress();

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading levels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Levels</Text>
        <Text style={styles.subtitle}>Complete pranks to unlock more!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.levelsContainer}
        showsVerticalScrollIndicator={false}>
        {LEVEL_DATA.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          const stars = progress[level.id]?.stars || 0;

          return (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelCard,
                !unlocked && styles.levelCardLocked,
              ]}
              disabled={!unlocked}
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/play')}>
              <View style={styles.levelNumber}>
                {unlocked ? (
                  <Text style={styles.levelNumberText}>{level.id}</Text>
                ) : (
                  <Lock size={20} color="#A8A8A8" />
                )}
              </View>

              <View style={styles.levelInfo}>
                <Text
                  style={[
                    styles.levelName,
                    !unlocked && styles.levelNameLocked,
                  ]}>
                  {level.name}
                </Text>
                <Text
                  style={[
                    styles.levelLocation,
                    !unlocked && styles.levelLocationLocked,
                  ]}>
                  {level.location}
                </Text>
              </View>

              <View style={styles.levelStars}>
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    color={stars >= star ? '#FFD700' : '#E2E8F0'}
                    fill={stars >= star ? '#FFD700' : 'transparent'}
                  />
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF5',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#718096',
    fontWeight: '600',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  levelsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  levelCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  levelCardLocked: {
    backgroundColor: '#F7FAFC',
    opacity: 0.6,
  },
  levelNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4299E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#4299E1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  levelNumberText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  levelNameLocked: {
    color: '#A8A8A8',
  },
  levelLocation: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  levelLocationLocked: {
    color: '#CBD5E0',
  },
  levelStars: {
    flexDirection: 'row',
    gap: 4,
  },
});
