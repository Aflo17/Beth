/*
  # Create page views tracking table

  1. New Tables
    - `page_views`
      - `id` (int, primary key)
      - `count` (int, tracks total page views)
      - `updated_at` (timestamp, tracks last update)

  2. Security
    - Enable RLS on `page_views` table
    - Add policy for public read access
    - Add policy for public update access (for incrementing counter)

  3. Initial Data
    - Insert initial row with id=1 and count=0
*/

CREATE TABLE IF NOT EXISTS page_views (
  id int PRIMARY KEY,
  count int NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow public read access to view the counter
CREATE POLICY "Allow public read access to page views"
  ON page_views
  FOR SELECT
  TO public
  USING (true);

-- Allow public update access to increment the counter
CREATE POLICY "Allow public update access to page views"
  ON page_views
  FOR UPDATE
  TO public
  USING (true);

-- Insert the initial row with id=1 and count=0
INSERT INTO page_views (id, count) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;