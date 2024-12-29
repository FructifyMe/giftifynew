-- Drop all policies first
drop policy if exists "Members can view their groups" on groups;
drop policy if exists "Anyone can create groups" on groups;
drop policy if exists "Creators can delete their groups" on groups;
drop policy if exists "Members can view group members" on group_members;
drop policy if exists "Creators can add members" on group_members;
drop policy if exists "Users can join groups" on group_members;
drop policy if exists "Creators can create invites" on group_invites;
drop policy if exists "Anyone can view invites" on group_invites;

-- Drop everything and start fresh
drop table if exists group_invites;
drop table if exists group_members;
drop table if exists groups;

-- Create groups table
create table groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_by uuid references auth.users not null,
  created_at timestamptz default now() not null
);

-- Create group_members table
create table group_members (
  group_id uuid references groups on delete cascade,
  user_id uuid references auth.users on delete cascade,
  joined_at timestamptz default now() not null,
  primary key (group_id, user_id)
);

-- Create group_invites table
create table group_invites (
  code text primary key,
  group_id uuid references groups on delete cascade not null,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table groups enable row level security;
alter table group_members enable row level security;
alter table group_invites enable row level security;

-- Groups policies
create policy "Anyone can create groups"
  on groups for insert
  with check (auth.uid() = created_by);

create policy "Members can view their groups"
  on groups for select
  using (auth.uid() = created_by);

create policy "Creators can delete their groups"
  on groups for delete
  using (auth.uid() = created_by);

-- Members policies
create policy "Members can view group members"
  on group_members for select
  using (
    exists (
      select 1 from groups
      where groups.id = group_id
      and groups.created_by = auth.uid()
    )
  );

create policy "Creators can add members"
  on group_members for insert
  with check (
    exists (
      select 1 from groups
      where groups.id = group_id
      and groups.created_by = auth.uid()
    )
  );

-- Invites policies
create policy "Creators can create invites"
  on group_invites for insert
  with check (
    exists (
      select 1 from groups
      where groups.id = group_id
      and groups.created_by = auth.uid()
    )
  );

create policy "Anyone can view invites"
  on group_invites for select
  using (true);
