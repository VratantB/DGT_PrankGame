import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pause, Play, Home, RotateCcw, ArrowRight, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import DetectionMeter from './DetectionMeter';

interface GameUIProps {
  objective: string;
  progress: number;
  gameState: 'playing' | 'paused' | 'complete' | 'failed';
  onPause: () => void;
  onResume: () => void;
  onRestart?: () => void;
  currentLevel?: number;
  detectionLevel?: number;
}

const getInstructionText = (progress: number): string => {
  if (progress === 0) return '👆 Drag the character to collect the glowing ketchup bottle';
  if (progress === 50) return '✅ Great! Now place it on the boss\'s chair without getting caught';
  if (progress === 100) return '🎉 Prank complete! Get to the exit!';
  return '';
};

export default function GameUI({
  objective,
  progress,
  gameState,
  onPause,
  onResume,
  onRestart,
  currentLevel = 1,
  detectionLevel = 0,
}: GameUIProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const nextLevel = currentLevel + 1;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const instructionOpacity = useRef(new Animated.Value(0)).current;
  const bannerScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(instructionOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(instructionOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(bannerScale, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bannerScale, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [progress, instructionOpacity, bannerScale]);

  const handleNextLevel = () => {
    if (onRestart) {
      onRestart();
    }
  };

  const handleTryAgain = () => {
    onResume();
    setTimeout(() => {
      router.replace('/(tabs)/play');
    }, 100);
  };

  const handleClose = () => {
    onResume();
    setTimeout(() => {
      router.replace('/(tabs)/levels');
    }, 100);
  };

  const handleHome = () => {
    onResume();
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 4) }]}>
        <View style={styles.objectiveContainer}>
          <Text style={styles.objectiveLabel}>OBJECTIVE</Text>
          <Text style={styles.objectiveText}>{objective}</Text>
        </View>

        <TouchableOpacity
          style={styles.pauseButton}
          onPress={onPause}
          activeOpacity={0.7}>
          <Pause size={24} color="#2D3748" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              })
            }
          ]}
        />
      </View>

      {gameState === 'playing' && <DetectionMeter level={detectionLevel} />}

      {gameState === 'playing' && (
        <Animated.View
          style={[
            styles.instructionBanner,
            {
              opacity: instructionOpacity,
              transform: [{ scale: bannerScale }],
            }
          ]}>
          <Text style={styles.instructionText}>{getInstructionText(progress)}</Text>
        </Animated.View>
      )}

      <Modal
        visible={gameState === 'paused'}
        transparent
        animationType="fade"
        onRequestClose={onResume}>
        <View style={styles.modal}>
          <Pressable style={styles.modalBackdrop} onPress={onResume} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>PAUSED</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={onResume}
              activeOpacity={0.7}>
              <Play size={20} color="#FFF" />
              <Text style={styles.modalButtonText}>Resume</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={handleHome}
              activeOpacity={0.7}>
              <Home size={20} color="#2D3748" />
              <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={gameState === 'complete'}
        transparent
        animationType="fade"
        onRequestClose={handleClose}>
        <View style={styles.modal}>
          <Pressable style={styles.modalBackdrop} onPress={handleClose} />
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}>
              <X size={28} color="#94A3B8" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>PRANK COMPLETE!</Text>
            <Text style={styles.modalSubtitle}>You sneaky legend!</Text>

            <View style={styles.stars}>
              <Text style={styles.starEmoji}>⭐</Text>
              <Text style={styles.starEmoji}>⭐</Text>
              <Text style={styles.starEmoji}>⭐</Text>
            </View>

            {nextLevel <= 10 ? (
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleNextLevel}
                activeOpacity={0.7}>
                <Text style={styles.modalButtonText}>Play Level {nextLevel}</Text>
                <ArrowRight size={20} color="#FFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleClose}
                activeOpacity={0.7}>
                <Text style={styles.modalButtonText}>View All Levels</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={handleHome}
              activeOpacity={0.7}>
              <Home size={20} color="#2D3748" />
              <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={gameState === 'failed'}
        transparent
        animationType="fade"
        onRequestClose={handleClose}>
        <View style={styles.modal}>
          <Pressable style={styles.modalBackdrop} onPress={handleClose} />
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}>
              <X size={28} color="#94A3B8" />
            </TouchableOpacity>

            <Text style={[styles.modalTitle, { color: '#EF4444' }]}>BUSTED!</Text>
            <Text style={styles.modalSubtitle}>You got caught!</Text>

            <Text style={styles.failureEmoji}>😱</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleTryAgain}
              activeOpacity={0.7}>
              <RotateCcw size={20} color="#FFF" />
              <Text style={styles.modalButtonText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={handleHome}
              activeOpacity={0.7}>
              <Home size={20} color="#2D3748" />
              <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  objectiveContainer: {
    flex: 1,
  },
  objectiveLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#718096',
    marginBottom: 2,
  },
  objectiveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  pauseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  instructionBanner: {
    backgroundColor: '#4299E1',
    marginHorizontal: 20,
    marginTop: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  instructionText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 22,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 32,
    paddingTop: 40,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  starEmoji: {
    fontSize: 40,
  },
  failureEmoji: {
    fontSize: 80,
    marginBottom: 32,
  },
  modalButton: {
    backgroundColor: '#4299E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginBottom: 12,
    width: '100%',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalButtonSecondary: {
    backgroundColor: '#EDF2F7',
    shadowOpacity: 0.1,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  modalButtonTextSecondary: {
    color: '#2D3748',
  },
});
