import { Gift, Users, LineChart, ArrowRight, GiftIcon } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Navigate, Link } from 'react-router-dom';

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
  const { user } = useAuth();

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
            <Link
              to="/signin"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
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
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                Start Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
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
                className="p-8 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors bg-card"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Start Gifting?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join Giftify today and make every gift-giving occasion special. Create your first wishlist in minutes.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg"
          >
            Create Your Account
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
