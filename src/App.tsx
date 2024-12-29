import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './lib/theme-provider'
import { AuthProvider } from './lib/auth'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'

// Pages
import Landing from './pages/Landing'
import Home from './pages/Home'
import Groups from './pages/Groups'
import Profile from './pages/Profile'
import Wishlists from './pages/Wishlists'
import Navigation from './components/Navigation'

// Group components
import JoinGroup from './components/groups/JoinGroup'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <main className="container mx-auto px-4 py-8">
                      <Routes>
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/wishlists" element={<Wishlists />} />
                        <Route path="/groups" element={<Groups />} />
                        <Route path="/groups/join/:code" element={<JoinGroup />} />
                        <Route path="/profile" element={<Profile />} />
                        {/* Redirect unknown routes to dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
