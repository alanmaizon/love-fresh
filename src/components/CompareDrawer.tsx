import { X } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

export default function CompareDrawer() {
  const { compareItems, isCompareOpen, setCompareOpen, clearCompare } = useCompare();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setCompareOpen(false)} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-4 border-b border-stone-100">
          <h2 className="text-lg font-semibold">Compare Items</h2>
          <button onClick={() => setCompareOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {compareItems.length === 0 ? (
            <p className="text-stone-500 text-center mt-10">No items to compare.</p>
          ) : (
            <div className="flex gap-4">
              {compareItems.map(item => (
                <div key={item.id} className="flex-1 space-y-4">
                  <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-xl bg-stone-100" />
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-emerald-600 font-semibold">€{item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-sm space-y-2 border-t pt-4">
                    <p><span className="text-stone-500">Category:</span> {item.category}</p>
                    <p><span className="text-stone-500">Rating:</span> {item.rating} / 5</p>
                    {item.caffeineLevel && <p><span className="text-stone-500">Caffeine:</span> {item.caffeineLevel}</p>}
                    {item.scent && <p><span className="text-stone-500">Scent:</span> {item.scent}</p>}
                    {item.vegan && <p><span className="text-stone-500">Vegan:</span> Yes</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {compareItems.length > 0 && (
          <div className="p-4 border-t border-stone-100">
            <button 
              onClick={clearCompare}
              className="w-full py-3 text-sm font-medium text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl"
            >
              Clear Comparison
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
