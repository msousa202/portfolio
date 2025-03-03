/*
  # Create subscribers table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for authenticated users to insert data
    - Add policy for authenticated users to read all data
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert new subscribers
CREATE POLICY "Anyone can subscribe" 
  ON subscribers 
  FOR INSERT 
  TO authenticated, anon
  WITH CHECK (true);

-- Allow authenticated users to read all subscribers
CREATE POLICY "Authenticated users can read all subscribers" 
  ON subscribers 
  FOR SELECT 
  TO authenticated 
  USING (true);