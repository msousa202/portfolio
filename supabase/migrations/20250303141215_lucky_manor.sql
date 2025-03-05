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

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact messages
CREATE POLICY "Anyone can submit contact messages" 
  ON contact_messages 
  FOR INSERT 
  TO authenticated, anon
  WITH CHECK (true);

-- Allow any authenticated user to read messages
CREATE POLICY "Authenticated users can read messages" 
  ON contact_messages 
  FOR SELECT 
  TO authenticated 
  USING (true);
