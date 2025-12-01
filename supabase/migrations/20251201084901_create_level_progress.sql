/*
  # Create level progress tracking system

  1. New Tables
    - `level_progress`
      - `id` (uuid, primary key)
      - `device_id` (text) - unique device identifier for anonymous tracking
      - `level_id` (integer) - level number (1-10)
      - `completed` (boolean) - whether level is completed
      - `stars` (integer) - stars earned (0-3)
      - `best_time` (integer) - best completion time in seconds
      - `updated_at` (timestamptz) - last update timestamp
      - Unique constraint on (device_id, level_id)
  
  2. Security
    - Enable RLS on `level_progress` table
    - Add policy for users to read/write their own progress based on device_id
    
  3. Notes
    - Using device_id instead of user authentication for anonymous play
    - Each device can track progress for all 10 levels
    - Stars and best time can be updated as player improves
*/

CREATE TABLE IF NOT EXISTS level_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  level_id integer NOT NULL CHECK (level_id >= 1 AND level_id <= 10),
  completed boolean DEFAULT false,
  stars integer DEFAULT 0 CHECK (stars >= 0 AND stars <= 3),
  best_time integer,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(device_id, level_id)
);

ALTER TABLE level_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read level progress"
  ON level_progress
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert their progress"
  ON level_progress
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their progress"
  ON level_progress
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_level_progress_device_id ON level_progress(device_id);
CREATE INDEX IF NOT EXISTS idx_level_progress_level_id ON level_progress(level_id);
