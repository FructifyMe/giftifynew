import { supabase } from './supabase'
import type { Database } from '../types/database.types'

type Wishlist = Database['public']['Tables']['wishlists']['Row']
type WishlistItem = Database['public']['Tables']['wishlist_items']['Row']
type Group = Database['public']['Tables']['groups']['Row']
type GroupMember = Database['public']['Tables']['group_members']['Row']

// Wishlist Functions
export async function createWishlist(wishlist: Database['public']['Tables']['wishlists']['Insert']) {
  const { data, error } = await supabase
    .from('wishlists')
    .insert(wishlist)
    .select()
    .single()

  if (error) throw error
  return data as Wishlist
}

export async function getWishlist(wishlistId: string) {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*, wishlist_items(*)')
    .eq('id', wishlistId)
    .single()

  if (error) throw error
  return data as Wishlist & { wishlist_items: WishlistItem[] }
}

export async function getUserWishlists(userId: string) {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Wishlist[]
}

export async function updateWishlist(
  wishlistId: string,
  updates: Database['public']['Tables']['wishlists']['Update']
) {
  const { data, error } = await supabase
    .from('wishlists')
    .update(updates)
    .eq('id', wishlistId)
    .select()
    .single()

  if (error) throw error
  return data as Wishlist
}

// Wishlist Item Functions
export async function createWishlistItem(
  item: Database['public']['Tables']['wishlist_items']['Insert']
) {
  const { data, error } = await supabase
    .from('wishlist_items')
    .insert(item)
    .select()
    .single()

  if (error) throw error
  return data as WishlistItem
}

export async function updateWishlistItem(
  itemId: string,
  updates: Database['public']['Tables']['wishlist_items']['Update']
) {
  const { data, error } = await supabase
    .from('wishlist_items')
    .update(updates)
    .eq('id', itemId)
    .select()
    .single()

  if (error) throw error
  return data as WishlistItem
}

export async function deleteWishlistItem(itemId: string) {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', itemId)

  if (error) throw error
}

// Group Functions
export async function createGroup(group: Database['public']['Tables']['groups']['Insert']) {
  const { data, error } = await supabase
    .from('groups')
    .insert(group)
    .select()
    .single()

  if (error) throw error
  return data as Group
}

export async function getGroup(groupId: string) {
  const { data, error } = await supabase
    .from('groups')
    .select('*, group_members(*)')
    .eq('id', groupId)
    .single()

  if (error) throw error
  return data as Group & { group_members: GroupMember[] }
}

export async function getUserGroups(userId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .select('group:groups(*)')
    .eq('user_id', userId)

  if (error) throw error
  return data.map(item => item.group) as Group[]
}

// Group Member Functions
export async function addGroupMember(
  member: Database['public']['Tables']['group_members']['Insert']
) {
  const { data, error } = await supabase
    .from('group_members')
    .insert(member)
    .select()
    .single()

  if (error) throw error
  return data as GroupMember
}

export async function removeGroupMember(groupId: string, userId: string) {
  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', userId)

  if (error) throw error
}

// Statistics Functions
export async function getUserStatistics(userId: string) {
  const [wishlists, groups, items] = await Promise.all([
    supabase
      .from('wishlists')
      .select('id')
      .eq('owner_id', userId),
    supabase
      .from('group_members')
      .select('id')
      .eq('user_id', userId),
    supabase
      .from('wishlist_items')
      .select('id')
      .eq('claimed_by', userId),
  ])

  return {
    activeWishlists: wishlists.data?.length || 0,
    groupsJoined: groups.data?.length || 0,
    itemsTracked: items.data?.length || 0,
    giftsGiven: 0, // TODO: Implement gift tracking
  }
}
