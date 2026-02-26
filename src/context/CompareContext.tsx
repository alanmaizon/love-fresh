import React, { createContext, useContext, useState } from 'react';
import { Product } from '../data/catalog';

interface CompareContextType {
  compareItems: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setCompareOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isCompareOpen, setCompareOpen] = useState(false);

  const toggleCompare = (product: Product) => {
    setCompareItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 2) {
        return [prev[1], product];
      }
      return [...prev, product];
    });
    setCompareOpen(true);
  };

  const clearCompare = () => {
    setCompareItems([]);
    setCompareOpen(false);
  };

  return (
    <CompareContext.Provider value={{ compareItems, toggleCompare, clearCompare, isCompareOpen, setCompareOpen }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within CompareProvider');
  return context;
};
