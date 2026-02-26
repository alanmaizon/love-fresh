import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { catalog } from '../data/catalog';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = catalog.find(p => p.slug === slug);
  
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [selectedGrind, setSelectedGrind] = useState<string>(product?.grindOptions?.[0] || '');
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="p-24 text-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    const variants: Record<string, string> = {};
    if (selectedSize) variants.size = selectedSize;
    if (selectedGrind) variants.grind = selectedGrind;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      variants
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Image */}
        <div className="aspect-square rounded-3xl overflow-hidden bg-stone-100 border border-stone-200">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-sm font-medium text-stone-500 flex items-center gap-1">
              ★ {product.rating}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-medium text-stone-900 mb-6">€{product.price.toFixed(2)}</p>
          <p className="text-stone-600 leading-relaxed mb-8">{product.description}</p>

          <div className="space-y-6 mb-10">
            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-stone-900 mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        selectedSize === size 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800' 
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Grind Selector (Coffee) */}
            {product.grindOptions && product.grindOptions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-stone-900 mb-3">Grind Type</h3>
                <div className="flex flex-wrap gap-3">
                  {product.grindOptions.map(grind => (
                    <button
                      key={grind}
                      onClick={() => setSelectedGrind(grind)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all capitalize ${
                        selectedGrind === grind 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800' 
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {grind}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              added 
                ? 'bg-stone-900 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-200'
            }`}
          >
            {added ? <><Check className="w-5 h-5" /> Added to Cart</> : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
