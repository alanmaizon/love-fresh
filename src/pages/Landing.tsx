import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        <img 
          src="https://picsum.photos/seed/hero/1920/1080" 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 text-center space-y-6 max-w-2xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Love Fresh.</h1>
          <p className="text-lg md:text-xl text-stone-200 font-medium">Curated coffee, skincare, and wellness for your daily rituals.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-semibold transition-colors"
          >
            Shop All Collection <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Collections */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'coffee', title: 'Coffee', img: 'https://picsum.photos/seed/cat-coffee/600/800' },
            { id: 'skincare', title: 'Skincare', img: 'https://picsum.photos/seed/cat-skin/600/800' },
            { id: 'wellness', title: 'Wellness', img: 'https://picsum.photos/seed/cat-well/600/800' },
          ].map(cat => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative h-96 rounded-2xl overflow-hidden block">
              <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                <span className="text-white/80 text-sm font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
