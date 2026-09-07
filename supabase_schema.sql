-- ============================================================
-- SQL SCHEMA FOR IT PM WORKSPACE SUPABASE INTEGRATION
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- 1. Table: team_members
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    max_tasks INT DEFAULT 4,
    color TEXT DEFAULT 'blue',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT,
    client TEXT,
    status TEXT DEFAULT 'Active',
    target_date TEXT,
    color TEXT DEFAULT 'blue',
    description TEXT,
    master_tasks JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: tasks
CREATE TABLE IF NOT EXISTS public.tasks (
    id BIGINT PRIMARY KEY,
    project_id TEXT,
    master_task_id TEXT,
    month TEXT,
    week TEXT,
    day TEXT,
    slot TEXT,
    type TEXT,
    task TEXT,
    category TEXT,
    pic TEXT,
    priority TEXT,
    blocker TEXT,
    deliverable TEXT,
    status TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allows full access for public key usage (Anon Key)
-- ============================================================

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public access team_members" ON public.team_members;
CREATE POLICY "Public access team_members" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access projects" ON public.projects;
CREATE POLICY "Public access projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access tasks" ON public.tasks;
CREATE POLICY "Public access tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
