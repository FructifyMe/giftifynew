import { supabase } from './supabase'

interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export async function handleSignUp({ email, password, firstName, lastName }: SignUpData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) throw error

    // If sign up successful and we have a user, create their profile
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: `${firstName} ${lastName}`,
        email: email,
        first_name: firstName,
        last_name: lastName,
        notification_preferences: {
          wishlist_updates: true,
          group_invites: true,
          price_alerts: true,
        },
        privacy_settings: {
          public_profile: false,
          show_wishlists: false,
        },
      })

      if (profileError) throw profileError
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error during sign up:', error)
    return { data: null, error }
  }
}

interface SignInData {
  email: string
  password: string
}

export async function handleSignIn({ email, password }: SignInData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error during sign in:', error)
    return { data: null, error }
  }
}

export async function handleGoogleSignIn() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error during Google sign in:', error)
    return { data: null, error }
  }
}

export async function handleSignOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error during sign out:', error)
    return { error }
  }
}
