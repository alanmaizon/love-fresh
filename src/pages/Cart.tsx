import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, Leaf } from 'lucide-react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();
  
  // Upsell trap state
  const [carbonNeutral, setCarbonNeutral] = useState(true);
  const CARBON_FEE = 1.99;

  const finalTotal = cartTotal + (carbonNeutral ? CARBON_FEE : 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-6 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-stone-50" referrerPolicy="no-referrer" />
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-stone-900">{item.name}</h3>
                    <div className="text-sm text-stone-500 mt-1 space-y-0.5">
                      {Object.entries(item.variants).map(([k, v]) => (
                        <div key={k} className="capitalize">{k}: {v}</div>
                      ))}
                    </div>
                  </div>
                  <p className="font-bold">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-stone-200 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-l-lg"
                      aria-label="Decrease quantity"
                    >-</button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-r-lg"
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-400 hover:text-red-500 transition-colors p-2"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              {/* Upsell Trap */}
              <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${carbonNeutral ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-stone-200'}`}>
                <input 
                  type="checkbox" 
                  checked={carbonNeutral}
                  onChange={(e) => setCarbonNeutral(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  aria-label="Add Carbon-neutral delivery"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center font-medium text-stone-900">
                    <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-emerald-600" /> Carbon-neutral delivery</span>
                    <span>+€{CARBON_FEE}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">Offset the carbon emissions of your delivery. (Pre-selected for a greener planet 🌱)</p>
                </div>
              </label>
            </div>

            <div className="border-t border-stone-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-stone-900">Total</span>
                <span className="text-2xl font-bold text-stone-900">€{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout', { state: { carbonNeutral } })}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
              aria-label="Proceed to Checkout"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
