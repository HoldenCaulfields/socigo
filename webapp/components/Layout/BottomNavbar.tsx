// components/Layout/BottomNavBar.tsx
import { MessageSquare, User, ShoppingCart, Home, Percent } from 'lucide-react';
import Link from 'next/link';

// Component này chỉ hiển thị trên Mobile
const BottomNavBar = () => {
  const navItems = [
    { icon: MessageSquare, label: 'Chat', href: '/chat' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: ShoppingCart, label: 'Cart', href: '/cart' },
    { icon: Home, label: 'Home', href: '/' },
    { icon: Percent, label: 'Deals', href: '/deals' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-2">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl flex justify-around h-16 max-w-sm mx-auto">
        {navItems.map((item, index) => (
          <Link 
            key={item.label} 
            href={item.href} 
            className={`flex flex-col items-center justify-center text-gray-500 hover:text-gray-900 transition-colors 
                        ${item.href === '/' ? 'text-gray-900 font-bold' : ''} // active state simulation
                      `}
            aria-label={item.label}
          >
            <item.icon size={20} />
            {/* <span className="text-xs mt-1">{item.label}</span> // Optional label */}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;