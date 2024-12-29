import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { User, Settings, Bell, Gift, LogOut } from 'lucide-react';
import { getProfile, updateProfile, getUserStatistics } from '../lib/database';
import type { Database } from '../types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Statistics = {
  activeWishlists: number;
  groupsJoined: number;
  itemsTracked: number;
  giftsGiven: number;
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [statistics, setStatistics] = useState<Statistics>({
    activeWishlists: 0,
    groupsJoined: 0,
    itemsTracked: 0,
    giftsGiven: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([
        getProfile(user.id),
        getUserStatistics(user.id),
      ]).then(([profileData, statsData]) => {
        setProfile(profileData);
        setStatistics(statsData);
        setLoading(false);
      }).catch((error) => {
        console.error('Error loading profile:', error);
        setLoading(false);
      });
    }
  }, [user]);

  const handleNotificationToggle = async (type: keyof Profile['notification_preferences']) => {
    if (!profile || !user) return;

    try {
      const updatedPreferences = {
        ...profile.notification_preferences,
        [type]: !profile.notification_preferences[type],
      };

      const updatedProfile = await updateProfile(user.id, {
        notification_preferences: updatedPreferences,
      });

      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating notification preferences:', error);
    }
  };

  const handlePrivacyToggle = async (type: keyof Profile['privacy_settings']) => {
    if (!profile || !user) return;

    try {
      const updatedSettings = {
        ...profile.privacy_settings,
        [type]: !profile.privacy_settings[type],
      };

      const updatedProfile = await updateProfile(user.id, {
        privacy_settings: updatedSettings,
      });

      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating privacy settings:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="hero-gradient absolute top-0 right-0 w-full h-32 rounded-b-3xl -z-10 opacity-20" />
        <div className="pt-8 px-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-xl">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {profile?.full_name || user?.user_metadata?.full_name || 'User Profile'}
              </h1>
              <p className="text-muted-foreground">{profile?.email || user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Account Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Account Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-medium mb-1">Email Notifications</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Manage your email notification preferences
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Wishlist Updates</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile?.notification_preferences.wishlist_updates}
                    onChange={() => handleNotificationToggle('wishlist_updates')}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-medium mb-1">Privacy Settings</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Control your profile visibility
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Public Profile</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile?.privacy_settings.public_profile}
                    onChange={() => handlePrivacyToggle('public_profile')}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Your Activity</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors text-center">
              <div className="text-3xl font-bold text-primary mb-1">{statistics.activeWishlists}</div>
              <div className="text-sm text-muted-foreground">Active Wishlists</div>
            </div>
            <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors text-center">
              <div className="text-3xl font-bold text-primary mb-1">{statistics.groupsJoined}</div>
              <div className="text-sm text-muted-foreground">Groups Joined</div>
            </div>
            <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors text-center">
              <div className="text-3xl font-bold text-primary mb-1">{statistics.itemsTracked}</div>
              <div className="text-sm text-muted-foreground">Items Tracked</div>
            </div>
            <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors text-center">
              <div className="text-3xl font-bold text-primary mb-1">{statistics.giftsGiven}</div>
              <div className="text-sm text-muted-foreground">Gifts Given</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="p-4 mt-8">
        <button
          onClick={() => signOut()}
          className="w-full p-4 rounded-lg border border-destructive/30 hover:border-destructive text-destructive hover:text-destructive-foreground hover:bg-destructive transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
