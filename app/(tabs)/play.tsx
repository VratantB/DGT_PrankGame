import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import GameCanvas from '@/components/game/GameCanvas';
import GameUI from '@/components/game/GameUI';
import { useLevelProgress } from '@/hooks/useLevelProgress';
import { getLevelConfig } from '@/constants/levels';

export default function PlayScreen() {
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'complete' | 'failed'>('playing');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [detectionLevel, setDetectionLevel] = useState(0);
  const { updateProgress } = useLevelProgress();

  const objective = getLevelConfig(currentLevel).objective;

  useEffect(() => {
    if (progress === 100 && gameState === 'playing') {
      setGameState('complete');
      updateProgress(currentLevel, true, 3);
    }
  }, [progress, gameState, currentLevel]);

  const handleRestart = () => {
    setCurrentLevel(prev => prev + 1);
    setProgress(0);
    setDetectionLevel(0);
    setGameState('playing');
  };

  const handleGameOver = () => {
    setGameState('failed');
  };

  return (
    <View style={styles.container}>
      <GameCanvas
        key={currentLevel}
        gameState={gameState}
        onProgressUpdate={setProgress}
        onDetectionChange={setDetectionLevel}
        onGameOver={handleGameOver}
        level={currentLevel}
      />
      <GameUI
        objective={objective}
        progress={progress}
        gameState={gameState}
        onPause={() => setGameState('paused')}
        onResume={() => setGameState('playing')}
        onRestart={handleRestart}
        currentLevel={currentLevel}
        detectionLevel={detectionLevel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBD5E0',
  },
});
