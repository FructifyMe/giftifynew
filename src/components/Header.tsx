import { Link } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { useAuth } from '../lib/auth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center space-x-2 text-primary">
            <Gift className="w-6 h-6" />
            <span className="text-xl font-bold">Giftify</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/wishlists"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Wishlists
                </Link>
                <Link
                  to="/groups"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Groups
                </Link>
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
