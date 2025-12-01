import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Play } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>DON'T GET{'\n'}CAUGHT!</Text>
        <Text style={styles.subtitle}>Sneak, Prank, Escape</Text>
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => router.push('/(tabs)/play')}
        activeOpacity={0.8}>
        <Play size={32} color="#FFF" fill="#FFF" />
        <Text style={styles.playButtonText}>START GAME</Text>
      </TouchableOpacity>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>💕</Text>
          <Text style={styles.featureText}>Romantic Moments</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>👀</Text>
          <Text style={styles.featureText}>Stealth & Timing</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>🎯</Text>
          <Text style={styles.featureText}>10 Unique Levels</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 52,
    fontWeight: '800',
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 60,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#718096',
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#48BB78',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 30,
    marginBottom: 60,
    shadowColor: '#48BB78',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '600',
    textAlign: 'center',
  },
});
