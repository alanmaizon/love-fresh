import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  const carbonNeutral = location.state?.carbonNeutral ?? true;
  const CARBON_FEE = 1.99;
  const finalTotal = cartTotal + (carbonNeutral ? CARBON_FEE : 0);

  const [step, setStep] = useState<'shipping' | 'review'>('shipping');
  const [phrase, setPhrase] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Dummy form state
  const [formData, setFormData] = useState({
    email: 'demo@example.com',
    name: 'Demo User',
    address: '123 Hackathon Way',
    city: 'San Francisco',
    zip: '94105'
  });

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="p-24 text-center">
        <p>Your cart is empty.</p>
        <Link to="/shop" className="text-emerald-600 hover:underline mt-4 inline-block">Return to shop</Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-stone-900">Demo Order Confirmed!</h1>
        <p className="text-lg text-stone-600 mb-8">
          This is a demo environment. No real order was placed, and no payment was captured.
        </p>
        <div className="bg-stone-50 rounded-2xl p-6 mb-8 text-left border border-stone-200">
          <h3 className="font-bold mb-4">Order Details</h3>
          <p className="text-sm text-stone-600 mb-2">Total Amount: €{finalTotal.toFixed(2)}</p>
          <p className="text-sm text-stone-600">Items: {items.length}</p>
        </div>
        <Link to="/" className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-stone-800 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    if (phrase !== 'GREENLIGHT') {
      setError('Please type GREENLIGHT to confirm this is a demo order.');
      return;
    }
    setError('');
    clearCart();
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Steps Indicator */}
      <div className="flex items-center justify-center mb-12">
        <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-emerald-600 font-bold' : 'text-stone-500 font-medium'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'shipping' ? 'bg-emerald-100' : 'bg-stone-100'}`}>1</div>
          Shipping
        </div>
        <div className="w-16 h-px bg-stone-300 mx-4"></div>
        <div className={`flex items-center gap-2 ${step === 'review' ? 'text-emerald-600 font-bold' : 'text-stone-500 font-medium'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'review' ? 'bg-emerald-100' : 'bg-stone-100'}`}>2</div>
          Review & Commit
        </div>
      </div>

      {step === 'shipping' && (
        <form onSubmit={handleShippingSubmit} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
              <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">City</label>
                <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">ZIP / Postal Code</label>
                <input type="text" required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end">
            <button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors" aria-label="Continue to Review step">
              Continue to Review
            </button>
          </div>
        </form>
      )}

      {step === 'review' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Review</h2>
              <button onClick={() => setStep('shipping')} className="text-sm text-emerald-600 font-medium hover:underline">Edit Shipping</button>
            </div>
            
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-stone-50" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-medium text-stone-900">{item.name} <span className="text-stone-500 font-normal">x{item.quantity}</span></p>
                    </div>
                  </div>
                  <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              {carbonNeutral && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Carbon-neutral delivery</span>
                  <span>+€{CARBON_FEE}</span>
                </div>
              )}
              <div className="pt-3 mt-3 border-t border-stone-200 flex justify-between items-center">
                <span className="font-bold text-lg text-stone-900">Total to Pay</span>
                <span className="font-bold text-2xl text-stone-900">€{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Demo Gate */}
          <div className="bg-red-50 border border-red-200 p-8 rounded-3xl">
            <div className="flex items-center gap-3 text-red-800 mb-4">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-lg font-bold">Demo Confirmation Gate</h3>
            </div>
            <p className="text-red-700 text-sm mb-6">
              To prevent accidental orders during demos, you must explicitly type the phrase <strong>GREENLIGHT</strong> below to commit the order.
            </p>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Type GREENLIGHT" 
                value={phrase}
                onChange={(e) => {
                  setPhrase(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full px-4 py-3 rounded-xl border outline-none font-mono uppercase ${error ? 'border-red-500 focus:ring-red-500' : 'border-red-300 focus:ring-red-500 focus:border-red-500'}`}
                aria-label="Confirmation phrase input"
              />
              {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
              
              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
                aria-label="Commit Demo Order"
              >
                <Lock className="w-5 h-5" /> Commit Demo Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
