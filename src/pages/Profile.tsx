import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { User, Settings, Bell, Gift, LogOut, Moon, Sun } from 'lucide-react';
import { getUserStatistics } from '../lib/database';
import { useTheme } from '../lib/theme-provider';

type Statistics = {
  activeWishlists: number;
  groupsJoined: number;
  itemsTracked: number;
  giftsGiven: number;
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics>({
    activeWishlists: 0,
    groupsJoined: 0,
    itemsTracked: 0,
    giftsGiven: 0,
  });

  useEffect(() => {
    if (user) {
      getUserStatistics(user.id)
        .then((statsData) => {
          setStatistics(statsData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading statistics:', error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  const firstName = user.user_metadata.first_name || '';
  const lastName = user.user_metadata.last_name || '';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg shadow-lg p-8 mb-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center transform transition-all duration-300 hover:rotate-12">
              {initials ? (
                <span className="text-3xl font-bold text-white">{initials}</span>
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {`${firstName} ${lastName}`}
              </h1>
              <p className="text-muted-foreground">Member since {new Date(user.created_at).toLocaleDateString()}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Activity Card */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="flex items-center space-x-2 mb-6">
              <Gift className="w-6 h-6 text-primary animate-pulse" />
              <h2 className="text-xl font-semibold">Activity</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="transform transition-all duration-300 hover:scale-105">
                <p className="text-muted-foreground">Active Wishlists</p>
                <p className="text-3xl font-bold text-primary">{statistics.activeWishlists}</p>
              </div>
              <div className="transform transition-all duration-300 hover:scale-105">
                <p className="text-muted-foreground">Groups Joined</p>
                <p className="text-3xl font-bold text-primary">{statistics.groupsJoined}</p>
              </div>
              <div className="transform transition-all duration-300 hover:scale-105">
                <p className="text-muted-foreground">Items Tracked</p>
                <p className="text-3xl font-bold text-primary">{statistics.itemsTracked}</p>
              </div>
              <div className="transform transition-all duration-300 hover:scale-105">
                <p className="text-muted-foreground">Gifts Given</p>
                <p className="text-3xl font-bold text-primary">{statistics.giftsGiven}</p>
              </div>
            </div>
          </div>

          {/* Account Card */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-6 h-6 text-primary animate-spin-slow" />
              <h2 className="text-xl font-semibold">Account</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-primary/10 rounded-md text-foreground hover:bg-primary/20 transition-all duration-300"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-destructive/80 to-destructive rounded-md text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
