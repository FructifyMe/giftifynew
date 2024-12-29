import { nanoid } from 'nanoid';
import { supabase } from './supabase';

export type Group = {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
};

export type GroupMember = {
  group_id: string;
  user_id: string;
  joined_at: string;
};

export type GroupInvite = {
  code: string;
  group_id: string;
  created_at: string;
};

export async function createGroup(name: string, description?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Must be logged in to create a group');

  const { data: group, error } = await supabase
    .from('groups')
    .insert({ name, description, created_by: user.id })
    .select()
    .single();

  if (error) throw error;
  return group;
}

export async function createInvite(groupId: string) {
  const code = nanoid(10);
  const { error } = await supabase
    .from('group_invites')
    .insert({ code, group_id: groupId });

  if (error) throw error;
  return code;
}

export async function getMyGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select('*');

  if (error) throw error;
  return data || [];
}

export async function getGroupMembers(groupId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .select('*')
    .eq('group_id', groupId);

  if (error) throw error;
  return data || [];
}
