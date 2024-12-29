import { Gift, Users, LineChart, ArrowRight, GiftIcon } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Navigate } from 'react-router-dom';

const features = [
  {
    title: 'Create Wishlists',
    description: 'Easily create and manage wishlists for any occasion. Add items with details like price and retailer links.',
    icon: Gift,
  },
  {
    title: 'Group Management',
    description: 'Create or join groups for different occasions. Perfect for family gatherings, Secret Santa, or any gift exchange.',
    icon: Users,
  },
  {
    title: 'Price Tracking',
    description: 'Keep track of item prices across different retailers. Get notified when prices drop.',
    icon: LineChart,
  },
];

export default function Landing() {
  const { signInWithGoogle, user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <GiftIcon className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Giftify</span>
            </div>
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="hero-gradient absolute top-0 right-0 w-1/2 h-[800px] rounded-bl-[100px] -z-10 opacity-20" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8">
              <h1 className="text-5xl font-bold text-primary mb-6 leading-tight">
                Make Gift-Giving 
                <span className="text-secondary block">Magical Again</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Giftify simplifies gift management with smart wishlists, group coordination,
                and price tracking. Never miss the perfect gift again.
              </p>
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                Start Now
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
            <div className="relative">
              <div className="relative w-full h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80"
                  alt="Gift giving"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="hero-gradient absolute top-0 left-0 w-full h-full -z-10 opacity-5" />
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything You Need for <span className="text-primary">Perfect Gifting</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-xl border border-primary/10 hover:border-primary transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-xl group"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="hero-gradient absolute top-0 right-0 w-1/2 h-full -z-10 opacity-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Transform Your
              <span className="text-primary block mt-2">Gift-Giving Experience?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of users who have made gifting stress-free with Giftify.
            </p>
            <button
              onClick={signInWithGoogle}
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GiftIcon className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-primary">Giftify</span>
          </div>
          <div className="text-center text-muted-foreground">
            <p> 2024 Giftify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
