import { View, StyleSheet, Animated } from 'react-native';
import { memo, useEffect, useRef } from 'react';

interface PropProps {
  type: 'table' | 'chair' | 'desk' | 'counter' | 'fridge' | 'stool' | 'sink' | 'whiteboard' | 'chalkboard' | 'teacher-desk' | 'student-desk-you' | 'student-desk-girl' | 'bookshelf' | 'student-desk' | 'bed' | 'door' | 'bench' | 'mirror' | 'umbrella' | 'railing' | 'stove' | 'book' | 'pencil-case' | 'water-bottle' | 'plant' | 'towel' | 'water-fountain' | 'note' | 'briefcase' | 'courage' | 'dumbbell' | 'shoes' | 'confidence' | 'phone' | 'student-id' | 'cupcake' | 'goodbye' | 'student' | 'girl' | 'exit-door' | 'crush-spot' | 'bedroom-door' | 'crush-wave' | 'selfie-spot' | 'dorm-door' | 'exit-kitchen' | 'romantic-spot';
  x: number;
  y: number;
  visible?: boolean;
  hasPrank?: boolean;
  width?: number;
  height?: number;
}

function Prop({ type, x, y, visible = true, hasPrank = false, width, height }: PropProps) {
  if (!visible) return null;

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.6)).current;

  const isCollectible = ['briefcase', 'note', 'courage', 'dumbbell', 'shoes', 'confidence', 'phone', 'student-id', 'cupcake'].includes(type);

  useEffect(() => {
    if (isCollectible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.6,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isCollectible, pulseAnim, glowAnim]);

  const renderProp = () => {
    switch (type) {
      case 'table':
        return (
          <View style={styles.table}>
            <View style={styles.tableTop} />
            <View style={styles.tableLegContainer}>
              <View style={styles.tableLeg} />
              <View style={styles.tableLeg} />
            </View>
          </View>
        );

      case 'chair':
        return (
          <View style={styles.chairContainer}>
            {!hasPrank && <View style={styles.targetIndicator} />}
            <View style={styles.chair}>
              {hasPrank && <View style={styles.prankSplat} />}
              <View style={styles.chairSeat} />
              <View style={styles.chairBack} />
              <View style={styles.chairLegContainer}>
                <View style={styles.chairLeg} />
                <View style={styles.chairLeg} />
              </View>
            </View>
          </View>
        );


      case 'note':
      case 'briefcase':
      case 'courage':
      case 'confidence':
      case 'student-id':
      case 'goodbye':
        return (
          <View style={styles.itemContainer}>
            <View style={styles.glowRing} />
            <View style={[styles.prankItem, { backgroundColor: '#FFD700' }]} />
          </View>
        );

      case 'dumbbell':
        return (
          <View style={styles.itemContainer}>
            <View style={styles.glowRing} />
            <View style={[styles.prankItem, { backgroundColor: '#4A5568', borderRadius: 20 }]} />
          </View>
        );

      case 'shoes':
        return (
          <View style={styles.itemContainer}>
            <View style={styles.glowRing} />
            <View style={[styles.prankItem, { backgroundColor: '#8B4513' }]} />
          </View>
        );

      case 'phone':
        return (
          <View style={styles.itemContainer}>
            <View style={styles.glowRing} />
            <View style={[styles.prankItem, { backgroundColor: '#1F2937' }]} />
          </View>
        );

      case 'cupcake':
        return (
          <View style={styles.itemContainer}>
            <View style={styles.glowRing} />
            <View style={[styles.prankItem, { backgroundColor: '#F472B6', borderRadius: 16 }]} />
          </View>
        );

      case 'fridge':
        return <View style={[styles.simpleBox, { backgroundColor: '#E0E0E0', width: width || 80, height: height || 140, borderRadius: 8 }]} />;

      case 'counter':
      case 'desk':
        return <View style={[styles.simpleBox, { backgroundColor: '#8D6E63', width: width || 180, height: height || 60 }]} />;

      case 'stool':
        return <View style={[styles.simpleBox, { backgroundColor: '#A1887F', width: 40, height: 40, borderRadius: 20 }]} />;

      case 'whiteboard':
        return <View style={[styles.simpleBox, { backgroundColor: '#FFF', width: width || 200, height: height || 120, borderWidth: 3, borderColor: '#000' }]} />;

      case 'chalkboard':
        return (
          <View style={[styles.simpleBox, { backgroundColor: '#2D3748', width: width || 240, height: height || 100, borderWidth: 4, borderColor: '#8B4513' }]}>
            <View style={{ position: 'absolute', top: 10, left: 10, width: 30, height: 3, backgroundColor: '#FFF', opacity: 0.3 }} />
            <View style={{ position: 'absolute', top: 20, left: 10, width: 50, height: 3, backgroundColor: '#FFF', opacity: 0.3 }} />
            <View style={{ position: 'absolute', top: 30, left: 10, width: 40, height: 3, backgroundColor: '#FFF', opacity: 0.3 }} />
          </View>
        );

      case 'teacher-desk':
        return <View style={[styles.simpleBox, { backgroundColor: '#8B6F47', width: width || 100, height: height || 60, borderWidth: 3, borderColor: '#654321' }]} />;

      case 'student-desk':
        return <View style={[styles.simpleBox, { backgroundColor: '#D4A574', width: width || 60, height: height || 50, borderWidth: 2, borderColor: '#8B6F47' }]} />;

      case 'student-desk-you':
        return (
          <View style={[styles.simpleBox, { backgroundColor: '#D4A574', width: width || 60, height: height || 50, borderWidth: 3, borderColor: '#4299E1' }]}>
            <View style={{ position: 'absolute', top: -8, left: 10, backgroundColor: '#4299E1', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
              <View style={{ width: 8, height: 8, backgroundColor: '#FFF', borderRadius: 4 }} />
            </View>
          </View>
        );

      case 'student-desk-girl':
        return (
          <View style={[styles.simpleBox, { backgroundColor: '#D4A574', width: width || 60, height: height || 50, borderWidth: 3, borderColor: '#F472B6' }]}>
            <View style={{ position: 'absolute', top: -8, right: 10, backgroundColor: '#F472B6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
              <View style={{ width: 8, height: 8, backgroundColor: '#FFF', borderRadius: 4 }} />
            </View>
          </View>
        );

      case 'book':
        return <View style={[styles.simpleBox, { backgroundColor: '#DC2626', width: width || 20, height: height || 15, borderRadius: 2 }]} />;

      case 'pencil-case':
        return <View style={[styles.simpleBox, { backgroundColor: '#7C3AED', width: width || 18, height: height || 12, borderRadius: 4 }]} />;

      case 'water-bottle':
        return <View style={[styles.simpleBox, { backgroundColor: '#3B82F6', width: width || 12, height: height || 25, borderRadius: 6, opacity: 0.7 }]} />;

      case 'plant':
        return <View style={[styles.simpleBox, { backgroundColor: '#10B981', width: width || 30, height: height || 40, borderRadius: 20 }]} />;

      case 'towel':
        return <View style={[styles.simpleBox, { backgroundColor: '#FB923C', width: width || 60, height: height || 80, borderRadius: 4 }]} />;

      case 'water-fountain':
        return <View style={[styles.simpleBox, { backgroundColor: '#60A5FA', width: width || 60, height: height || 80, borderRadius: 8 }]} />;

      case 'bookshelf':
        return <View style={[styles.simpleBox, { backgroundColor: '#6D4C41', width: width || 80, height: height || 180 }]} />;

      case 'bed':
        return <View style={[styles.simpleBox, { backgroundColor: '#F06292', width: width || 120, height: height || 100 }]} />;

      case 'mirror':
        return <View style={[styles.simpleBox, { backgroundColor: '#B4D5FE', width: width || 100, height: height || 200, opacity: 0.6 }]} />;

      case 'umbrella':
        return <View style={[styles.simpleBox, { backgroundColor: '#EF4444', width: width || 80, height: height || 100, borderRadius: 40 }]} />;

      case 'railing':
        return <View style={[styles.simpleBox, { backgroundColor: '#94A3B8', width: width || 150, height: height || 20 }]} />;

      case 'door':
        return <View style={[styles.simpleBox, { backgroundColor: '#8B4513', width: width || 80, height: height || 140 }]} />;

      case 'girl':
        return (
          <View style={styles.girlContainer}>
            {!hasPrank && <View style={styles.targetIndicator} />}
            {hasPrank && (
              <View style={styles.girlWithNote}>
                <View style={styles.girlFigure} />
                <View style={styles.heartIndicator}>
                  <View style={styles.heart} />
                </View>
              </View>
            )}
            {!hasPrank && <View style={styles.girlFigure} />}
          </View>
        );

      case 'student':
      case 'exit-door':
      case 'crush-spot':
      case 'bedroom-door':
      case 'crush-wave':
      case 'selfie-spot':
      case 'dorm-door':
      case 'exit-kitchen':
      case 'romantic-spot':
      case 'bench':
        return (
          <View style={styles.targetZone}>
            {!hasPrank && <View style={styles.targetIndicator} />}
            {hasPrank && <View style={styles.prankIndicator} />}
          </View>
        );

      default:
        return <View style={[styles.simpleBox, { backgroundColor: '#BDBDBD', width: width || 60, height: height || 60 }]} />;
    }
  };

  return (
    <View style={[styles.container, { left: x, top: y }]}>
      {isCollectible && (
        <>
          <Animated.View
            style={[
              styles.outerGlow,
              {
                opacity: glowAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.innerGlow,
              {
                opacity: glowAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
        </>
      )}
      <Animated.View
        style={isCollectible ? { transform: [{ scale: pulseAnim }] } : undefined}
      >
        {renderProp()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    zIndex: -2,
  },
  innerGlow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    zIndex: -1,
  },
  table: {
    alignItems: 'center',
  },
  tableTop: {
    width: 120,
    height: 80,
    backgroundColor: '#8D6E63',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#5D4037',
  },
  tableLegContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -6,
  },
  tableLeg: {
    width: 12,
    height: 40,
    backgroundColor: '#6D4C41',
    borderRadius: 6,
  },
  chairContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetIndicator: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4CAF50',
    opacity: 0.5,
  },
  chair: {
    alignItems: 'center',
  },
  prankSplat: {
    position: 'absolute',
    top: 8,
    width: 40,
    height: 40,
    backgroundColor: '#F44336',
    borderRadius: 20,
    opacity: 0.8,
    zIndex: 1,
  },
  chairSeat: {
    width: 60,
    height: 60,
    backgroundColor: '#78909C',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#546E7A',
  },
  chairBack: {
    position: 'absolute',
    top: -40,
    width: 60,
    height: 50,
    backgroundColor: '#78909C',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#546E7A',
  },
  chairLegContainer: {
    width: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  chairLeg: {
    width: 8,
    height: 30,
    backgroundColor: '#546E7A',
    borderRadius: 4,
  },
  ketchupContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    opacity: 0.3,
  },
  ketchup: {
    alignItems: 'center',
    transform: [{ scale: 1.5 }],
  },
  ketchupCap: {
    width: 20,
    height: 12,
    backgroundColor: '#C62828',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: '#8E0000',
  },
  ketchupBody: {
    width: 24,
    height: 36,
    backgroundColor: '#F44336',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 2,
    borderColor: '#C62828',
    marginTop: -2,
  },
  placeholder: {
    width: 40,
    height: 40,
    backgroundColor: '#BDBDBD',
    borderRadius: 8,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  prankItem: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  simpleBox: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  drawerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetZone: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prankIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  girlContainer: {
    width: 50,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  girlFigure: {
    width: 40,
    height: 60,
    backgroundColor: '#F472B6',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#EC4899',
  },
  girlWithNote: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIndicator: {
    position: 'absolute',
    top: -15,
    right: -5,
  },
  heart: {
    width: 16,
    height: 16,
    backgroundColor: '#F43F5E',
    transform: [{ rotate: '45deg' }],
    borderRadius: 8,
  },
});

export default memo(Prop);
