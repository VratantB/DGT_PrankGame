import { View, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import { useEffect, useRef, useState, useCallback } from 'react';
import Player from './Player';
import NPC from './NPC';
import Prop from './Prop';
import { getLevelConfig } from '@/constants/levels';

const { width, height } = Dimensions.get('window');
const GAME_WIDTH = width;
const GAME_HEIGHT = height;

interface GameCanvasProps {
  gameState: 'playing' | 'paused' | 'complete' | 'failed';
  onProgressUpdate: (progress: number) => void;
  level?: number;
}

export default function GameCanvas({ gameState, onProgressUpdate, level = 1 }: GameCanvasProps) {
  const levelConfig = getLevelConfig(level);
  const centerX = GAME_WIDTH / 2;
  const centerY = GAME_HEIGHT * 0.55;

  const playerX = useRef(new Animated.Value(100)).current;
  const playerY = useRef(new Animated.Value(GAME_HEIGHT - 150)).current;
  const npcX = useRef(new Animated.Value(centerX + levelConfig.npc.startPosition.x)).current;
  const npcY = useRef(new Animated.Value(centerY + levelConfig.npc.startPosition.y)).current;

  const [hasItem, setHasItem] = useState(false);
  const [prankComplete, setPrankComplete] = useState(false);
  const npcDirection = useRef(1);
  const lastPlayerPos = useRef({ x: 100, y: GAME_HEIGHT - 150 });

  const checkCollisions = useCallback(() => {
    const x = lastPlayerPos.current.x;
    const y = lastPlayerPos.current.y;

    const itemX = centerX + levelConfig.prankItem.position.x;
    const itemY = centerY + levelConfig.prankItem.position.y;
    const itemDist = Math.sqrt(Math.pow(x - itemX, 2) + Math.pow(y - itemY, 2));

    if (itemDist < 60 && !hasItem) {
      setHasItem(true);
      onProgressUpdate(50);
    }

    if (!hasItem || prankComplete) return;

    const targetX = centerX + levelConfig.target.position.x;
    const targetY = centerY + levelConfig.target.position.y;
    const targetDist = Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2));

    if (targetDist < 80) {
      setPrankComplete(true);
      onProgressUpdate(100);
    }
  }, [hasItem, prankComplete, levelConfig, centerX, centerY, onProgressUpdate]);

  useEffect(() => {
    const listenerId = playerX.addListener(({ value }) => {
      lastPlayerPos.current.x = value;
      checkCollisions();
    });
    const listenerIdY = playerY.addListener(({ value }) => {
      lastPlayerPos.current.y = value;
      checkCollisions();
    });

    return () => {
      playerX.removeListener(listenerId);
      playerY.removeListener(listenerIdY);
    };
  }, [playerX, playerY, checkCollisions]);

  const currentNpcX = useRef(centerX + levelConfig.npc.startPosition.x);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const npcInterval = setInterval(() => {
      let newX = currentNpcX.current + (100 * npcDirection.current);

      if (newX >= GAME_WIDTH - 100) {
        npcDirection.current = -1;
        newX = GAME_WIDTH - 100;
      }
      if (newX <= 100) {
        npcDirection.current = 1;
        newX = 100;
      }

      currentNpcX.current = newX;
      Animated.timing(npcX, {
        toValue: newX,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => clearInterval(npcInterval);
  }, [gameState, npcX, centerX, levelConfig.npc.startPosition.x]);

  const gestureStartPos = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => gameState === 'playing',
      onMoveShouldSetPanResponder: () => gameState === 'playing',
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const dx = locationX - lastPlayerPos.current.x;
        const dy = locationY - lastPlayerPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 60) {
          gestureStartPos.current = { x: lastPlayerPos.current.x, y: lastPlayerPos.current.y };
          return true;
        }
        return false;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gameState !== 'playing') return;

        const newX = Math.max(40, Math.min(GAME_WIDTH - 40, gestureStartPos.current.x + gestureState.dx));
        const newY = Math.max(100, Math.min(GAME_HEIGHT - 40, gestureStartPos.current.y + gestureState.dy));

        playerX.setValue(newX);
        playerY.setValue(newY);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const newX = Math.max(40, Math.min(GAME_WIDTH - 40, gestureStartPos.current.x + gestureState.dx));
        const newY = Math.max(100, Math.min(GAME_HEIGHT - 40, gestureStartPos.current.y + gestureState.dy));
        lastPlayerPos.current = { x: newX, y: newY };
      },
    })
  ).current;

  return (
    <View style={styles.canvas} {...panResponder.panHandlers}>
      <View style={[styles.floor, { backgroundColor: levelConfig.floorColor }]} />

      {levelConfig.obstacles.map((obstacle, index) => (
        <View
          key={`obstacle-${index}`}
          style={[
            styles.wall,
            {
              top: centerY + obstacle.position.y - obstacle.height / 2,
              left: centerX + obstacle.position.x - obstacle.width / 2,
              width: obstacle.width,
              height: obstacle.height,
            },
          ]}
        />
      ))}

      {levelConfig.props.map((prop, index) => {
        const propWidth = prop.width || 60;
        const propHeight = prop.height || 60;
        return (
          <Prop
            key={`prop-${index}`}
            type={prop.type as any}
            x={centerX + prop.position.x - propWidth / 2}
            y={centerY + prop.position.y - propHeight / 2}
            width={prop.width}
            height={prop.height}
          />
        );
      })}

      <Prop
        type={levelConfig.prankItem.type as any}
        x={centerX + levelConfig.prankItem.position.x - 16}
        y={centerY + levelConfig.prankItem.position.y - 16}
        visible={!hasItem}
      />

      <Prop
        type={levelConfig.target.type as any}
        x={centerX + levelConfig.target.position.x - 40}
        y={centerY + levelConfig.target.position.y - 40}
        hasPrank={prankComplete}
      />

      <Animated.View
        style={[
          styles.playerContainer,
          {
            transform: [
              { translateX: Animated.subtract(playerX, 30) },
              { translateY: Animated.subtract(playerY, 30) },
            ],
          },
        ]}>
        <Player hasItem={hasItem} />
      </Animated.View>

      <Animated.View
        style={[
          styles.npcContainer,
          {
            transform: [
              { translateX: Animated.subtract(npcX, 40) },
              { translateY: Animated.subtract(npcY, 60) },
            ],
          },
        ]}>
        <NPC type={levelConfig.npc.type as any} state={levelConfig.npc.animation as any} />
      </Animated.View>

      {prankComplete && (
        <View
          style={[
            styles.exitZone,
            {
              top: centerY + levelConfig.escapeZone.position.y - levelConfig.escapeZone.height / 2,
              left: centerX + levelConfig.escapeZone.position.x - levelConfig.escapeZone.width / 2,
              width: levelConfig.escapeZone.width,
              height: levelConfig.escapeZone.height,
            }
          ]}>
          <View style={styles.door} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#F0F4F8',
  },
  floor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: GAME_HEIGHT,
  },
  wall: {
    position: 'absolute',
    backgroundColor: '#A0AEC0',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#718096',
  },
  playerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 60,
    height: 60,
  },
  npcContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 80,
    height: 120,
  },
  exitZone: {
    position: 'absolute',
    backgroundColor: '#48BB78',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#38A169',
  },
  door: {
    width: 60,
    height: 100,
    backgroundColor: '#8D6E63',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6D4C41',
  },
});
