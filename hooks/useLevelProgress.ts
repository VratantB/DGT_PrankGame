import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import * as Device from 'expo-constants';

export interface LevelProgress {
  level_id: number;
  completed: boolean;
  stars: number;
  best_time?: number;
}

export function useLevelProgress() {
  const [progress, setProgress] = useState<Record<number, LevelProgress>>({});
  const [loading, setLoading] = useState(true);
  const deviceId = Device.default.sessionId || 'default';

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('level_progress')
        .select('*')
        .eq('device_id', deviceId);

      if (error) throw error;

      const progressMap: Record<number, LevelProgress> = {};
      data?.forEach((item) => {
        progressMap[item.level_id] = {
          level_id: item.level_id,
          completed: item.completed,
          stars: item.stars,
          best_time: item.best_time,
        };
      });

      setProgress(progressMap);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    levelId: number,
    completed: boolean,
    stars: number,
    time?: number
  ) => {
    try {
      const existingProgress = progress[levelId];
      const newStars = Math.max(existingProgress?.stars || 0, stars);
      const newBestTime =
        time && existingProgress?.best_time
          ? Math.min(existingProgress.best_time, time)
          : time || existingProgress?.best_time;

      const { error } = await supabase
        .from('level_progress')
        .upsert(
          {
            device_id: deviceId,
            level_id: levelId,
            completed,
            stars: newStars,
            best_time: newBestTime,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'device_id,level_id',
          }
        );

      if (error) throw error;

      await loadProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return progress[levelId - 1]?.completed || false;
  };

  return {
    progress,
    loading,
    updateProgress,
    isLevelUnlocked,
  };
}
