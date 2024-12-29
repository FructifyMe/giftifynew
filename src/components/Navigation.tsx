import { Link } from 'react-router-dom'
import { Home, Gift, Users, User, LogOut } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function Navigation() {
  const { signOut, user } = useAuth()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <Gift className="w-7 h-7" />
            <span>Giftify</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/wishlists" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Gift size={20} />
              <span>Wishlists</span>
            </Link>
            <Link to="/groups" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Users size={20} />
              <span>Groups</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <User size={20} />
              <span>{user?.user_metadata?.full_name || 'Profile'}</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
