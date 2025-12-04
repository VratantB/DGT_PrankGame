import { View, StyleSheet } from 'react-native';
import { memo } from 'react';

interface PlayerProps {
  hasItem?: boolean;
  itemType?: 'note' | 'default';
}

function Player({ hasItem = false, itemType = 'default' }: PlayerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.playerOutline} />
      <View style={styles.head}>
        <View style={styles.eye} />
        <View style={styles.eye} />
      </View>
      <View style={styles.body} />
      {hasItem && (
        <View style={styles.item}>
          <View style={styles.itemGlow} />
          {itemType === 'note' ? (
            <View style={styles.note} />
          ) : (
            <View style={styles.genericItem} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerOutline: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF9800',
    opacity: 0.4,
  },
  head: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE0B2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  eye: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2D3748',
  },
  body: {
    width: 24,
    height: 20,
    backgroundColor: '#4FC3F7',
    borderRadius: 12,
    marginTop: -4,
    borderWidth: 2,
    borderColor: '#0288D1',
  },
  item: {
    position: 'absolute',
    top: -15,
    right: -15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemGlow: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD700',
    opacity: 0.4,
  },
  note: {
    width: 20,
    height: 20,
    backgroundColor: '#FBBF24',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F59E0B',
    transform: [{ rotate: '45deg' }],
  },
  genericItem: {
    width: 18,
    height: 24,
    backgroundColor: '#FFD700',
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
});

export default memo(Player);
