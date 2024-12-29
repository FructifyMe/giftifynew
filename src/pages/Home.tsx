import { Link } from 'react-router-dom'
import { Gift, Users, Bell } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/wishlists"
              className="p-6 border rounded-lg hover:border-primary transition-colors group"
            >
              <Gift className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                Create Wishlist
              </h3>
              <p className="text-muted-foreground">
                Start a new wishlist for any occasion
              </p>
            </Link>
            <Link
              to="/groups"
              className="p-6 border rounded-lg hover:border-primary transition-colors group"
            >
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                Join Group
              </h3>
              <p className="text-muted-foreground">
                Connect with family and friends
              </p>
            </Link>
          </div>
        </div>

        {/* Notifications */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Bell className="text-muted-foreground" size={20} />
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground text-center py-8">
              No recent activity to show
            </p>
          </div>
        </div>
      </div>

      {/* Recent Wishlists */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Wishlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-lg">
            <p className="text-muted-foreground text-center">
              You haven't created any wishlists yet
            </p>
          </div>
        </div>
      </div>

      {/* Recent Groups */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-lg">
            <p className="text-muted-foreground text-center">
              You haven't joined any groups yet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
