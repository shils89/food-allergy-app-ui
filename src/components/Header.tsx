import React from 'react';
import { Utensils } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Utensils size={32} className="text-white" />
          <h1 className="text-2xl md:text-3xl font-bold">Food Allergy Detector</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-green-100 transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-green-100 transition-colors">About</a></li>
            <li><a href="#allergens" className="hover:text-green-100 transition-colors">Allergens</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
