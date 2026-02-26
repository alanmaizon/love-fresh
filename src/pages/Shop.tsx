import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { catalog } from '../data/catalog';
import { X, Filter, Scale } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleCompare, compareItems } = useCompare();
  
  // Budget mode toggle
  const [budgetMode, setBudgetMode] = useState(false);
  const BUDGET_LIMIT = 20;

  // Filters
  const category = searchParams.get('category');
  const priceMax = searchParams.get('priceMax');
  const scent = searchParams.get('scent');
  const caffeineLevel = searchParams.get('caffeineLevel');
  const vegan = searchParams.get('vegan');
  const minRating = searchParams.get('rating');
  const sort = searchParams.get('sort') || 'newest';

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filteredProducts = useMemo(() => {
    let result = [...catalog];

    if (category) result = result.filter(p => p.category === category);
    if (priceMax) result = result.filter(p => p.price <= Number(priceMax));
    if (scent) result = result.filter(p => p.scent === scent);
    if (caffeineLevel) result = result.filter(p => p.caffeineLevel === caffeineLevel);
    if (vegan === 'true') result = result.filter(p => p.vegan);
    if (minRating) result = result.filter(p => p.rating >= Number(minRating));

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      result.sort((a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0));
    }

    return result;
  }, [category, priceMax, scent, caffeineLevel, vegan, minRating, sort]);

  const activeFiltersCount = Array.from(searchParams.keys()).filter(k => k !== 'sort').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</h2>
            {activeFiltersCount > 0 && (
              <button onClick={() => setSearchParams(new URLSearchParams())} className="text-xs text-stone-500 hover:text-stone-900 underline">
                Clear all
              </button>
            )}
          </div>

          {/* Budget Mode Toggle */}
          <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={budgetMode}
                onChange={(e) => {
                  setBudgetMode(e.target.checked);
                  updateFilter('priceMax', e.target.checked ? BUDGET_LIMIT.toString() : null);
                }}
                className="w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-emerald-900">Budget Mode (&lt;€{BUDGET_LIMIT})</span>
            </label>
          </div>

          <div className="space-y-6">
            {/* Category */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 mb-3">Category</h3>
              <div className="space-y-2">
                {['coffee', 'skincare', 'wellness'].map(c => (
                  <label key={c} className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={category === c}
                      onChange={() => updateFilter('category', c)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-stone-600 capitalize">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Caffeine Level (only if coffee or no category) */}
            {(!category || category === 'coffee') && (
              <div>
                <h3 className="text-sm font-semibold text-stone-900 mb-3">Caffeine Level</h3>
                <div className="space-y-2">
                  {['high', 'medium', 'low', 'decaf'].map(c => (
                    <label key={c} className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="caffeineLevel" 
                        checked={caffeineLevel === c}
                        onChange={() => updateFilter('caffeineLevel', c)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-stone-600 capitalize">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Rating */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 mb-3">Minimum Rating</h3>
              <input 
                type="range" 
                min="3" max="5" step="0.5" 
                value={minRating || "3"} 
                onChange={(e) => updateFilter('rating', e.target.value)}
                className="w-full accent-emerald-600"
              />
              <div className="text-xs text-stone-500 mt-1">{minRating ? `${minRating}+ Stars` : 'Any'}</div>
            </div>
            
            {/* Vegan */}
            <div>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={vegan === 'true'}
                  onChange={(e) => updateFilter('vegan', e.target.checked ? 'true' : null)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-semibold text-stone-900">Vegan Only</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-bold">Shop Collection</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-stone-500">Sort by:</span>
            <select 
              value={sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="text-sm border-stone-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filters Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.from(searchParams.entries()).map(([key, value]) => {
              if (key === 'sort') return null;
              return (
                <span key={key} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-xs font-medium text-stone-700 border border-stone-200">
                  {key}: {value}
                  <button onClick={() => updateFilter(key, null)} className="hover:text-stone-900 ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <p className="text-stone-500">No products match your filters.</p>
            <button onClick={() => setSearchParams(new URLSearchParams())} className="mt-4 text-emerald-600 font-medium hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const isUnderBudget = budgetMode && product.price <= BUDGET_LIMIT;
              const isCompared = compareItems.some(p => p.id === product.id);
              
              return (
                <div key={product.id} className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border ${isUnderBudget ? 'border-emerald-400 shadow-sm shadow-emerald-100' : 'border-stone-100'} hover:shadow-xl transition-all duration-300`}>
                  <Link to={`/p/${product.slug}`} className="relative aspect-square overflow-hidden bg-stone-100 block">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    {product.newest && (
                      <span className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">New</span>
                    )}
                  </Link>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/p/${product.slug}`} className="font-semibold text-stone-900 hover:text-emerald-600 transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleCompare(product); }}
                        className={`p-1.5 rounded-full transition-colors ${isCompared ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-400 hover:text-stone-600'}`}
                        title="Compare"
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-stone-500 mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-lg">€{product.price.toFixed(2)}</span>
                      <span className="text-xs font-medium text-stone-400 flex items-center gap-1">
                        ★ {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
