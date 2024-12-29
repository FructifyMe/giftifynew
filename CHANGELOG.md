# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-12-29

### Added
- Automatic user profile creation on sign up
- Profile synchronization on sign in and user updates
- Better error handling in authentication
- Automatic navigation after successful sign in

### Changed
- Improved auth context with better TypeScript types
- Enhanced error messages for auth operations
- Simplified sign up process

## [0.1.0] - 2024-12-29

### Added
- Basic authentication system using Supabase
  - Email/password sign up and sign in
  - Protected routes with authentication check
  - Auth context for managing user state
- Core components
  - SignIn component with email/password fields
  - SignUp component with email/password fields
  - ProtectedRoute component for route protection
- Routing system
  - Public routes (/signin, /signup)
  - Protected routes (/dashboard, /wishlists, /groups, /profile)
  - Route protection and redirection
- Landing page with basic design
- Profile page with user information
- Initial Supabase integration and configuration
