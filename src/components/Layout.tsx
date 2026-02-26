import { Outlet, Link } from 'react-router-dom';
import { ShoppingBag, Scale } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import CompareDrawer from './CompareDrawer';

export default function Layout() {
  const { cartCount } = useCart();
  const { compareItems, setCompareOpen } = useCompare();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold tracking-tighter text-emerald-800">
              Love Fresh.
            </Link>
            <nav className="hidden md:flex gap-6 ml-8">
              <Link to="/shop" className="text-sm font-medium hover:text-emerald-600 transition-colors">Shop All</Link>
              <Link to="/shop?category=coffee" className="text-sm font-medium hover:text-emerald-600 transition-colors">Coffee</Link>
              <Link to="/shop?category=skincare" className="text-sm font-medium hover:text-emerald-600 transition-colors">Skincare</Link>
              <Link to="/shop?category=wellness" className="text-sm font-medium hover:text-emerald-600 transition-colors">Wellness</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {compareItems.length > 0 && (
              <button 
                onClick={() => setCompareOpen(true)}
                className="relative p-2 text-stone-600 hover:text-emerald-600 transition-colors"
                aria-label="Compare items"
              >
                <Scale className="w-5 h-5" />
                <span className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareItems.length}
                </span>
              </button>
            )}
            <Link to="/cart" className="relative p-2 text-stone-600 hover:text-emerald-600 transition-colors" aria-label="View cart">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-stone-900 text-stone-400 py-12 text-center text-sm">
        <p>&copy; 2026 Love Fresh Marketplace. Demo Store.</p>
      </footer>
      <CompareDrawer />
    </div>
  );
}
