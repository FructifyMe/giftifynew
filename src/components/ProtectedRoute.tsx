import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    // You might want to show a loading spinner here
    return <div>Loading...</div>
  }

  if (!user) {
    // Redirect to the sign-in page but save the attempted URL
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return <>{children}</>
}
