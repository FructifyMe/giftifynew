export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          email: string
          notification_preferences: {
            wishlist_updates: boolean
            group_invites: boolean
            price_alerts: boolean
          }
          privacy_settings: {
            public_profile: boolean
            show_wishlists: boolean
          }
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          email: string
          notification_preferences?: {
            wishlist_updates?: boolean
            group_invites?: boolean
            price_alerts?: boolean
          }
          privacy_settings?: {
            public_profile?: boolean
            show_wishlists?: boolean
          }
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          email?: string
          notification_preferences?: {
            wishlist_updates?: boolean
            group_invites?: boolean
            price_alerts?: boolean
          }
          privacy_settings?: {
            public_profile?: boolean
            show_wishlists?: boolean
          }
        }
      }
      wishlists: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          owner_id: string
          is_public: boolean
          occasion: string | null
          occasion_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          owner_id: string
          is_public?: boolean
          occasion?: string | null
          occasion_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          owner_id?: string
          is_public?: boolean
          occasion?: string | null
          occasion_date?: string | null
        }
      }
      wishlist_items: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          wishlist_id: string
          name: string
          description: string | null
          price: number | null
          url: string | null
          image_url: string | null
          priority: number
          is_claimed: boolean
          claimed_by: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          wishlist_id: string
          name: string
          description?: string | null
          price?: number | null
          url?: string | null
          image_url?: string | null
          priority?: number
          is_claimed?: boolean
          claimed_by?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          wishlist_id?: string
          name?: string
          description?: string | null
          price?: number | null
          url?: string | null
          image_url?: string | null
          priority?: number
          is_claimed?: boolean
          claimed_by?: string | null
          notes?: string | null
        }
      }
      groups: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          owner_id: string
          is_active: boolean
          event_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          owner_id: string
          is_active?: boolean
          event_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          owner_id?: string
          is_active?: boolean
          event_date?: string | null
        }
      }
      group_members: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          group_id: string
          user_id: string
          role: 'admin' | 'member'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          group_id: string
          user_id: string
          role?: 'admin' | 'member'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          group_id?: string
          user_id?: string
          role?: 'admin' | 'member'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
