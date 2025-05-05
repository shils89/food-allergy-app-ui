import React from 'react';
import { UserAllergy } from '../types';
import { AlertCircle } from 'lucide-react';

interface AllergenSelectorProps {
  userAllergies: UserAllergy[];
  onToggleAllergen: (id: string) => void;
}

const AllergenSelector: React.FC<AllergenSelectorProps> = ({ userAllergies, onToggleAllergen }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertCircle size={20} className="text-amber-500" />
        <h2 className="text-xl font-semibold">Your Allergies</h2>
      </div>
      
      <p className="text-gray-600 mb-4">
        Select the allergens you're sensitive to, and we'll check if your food might contain them.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {userAllergies.map((allergy) => (
          <div 
            key={allergy.id}
            onClick={() => onToggleAllergen(allergy.id)}
            className={`
              p-3 rounded-md cursor-pointer transition-all flex items-center
              ${allergy.selected 
                ? 'bg-red-100 border border-red-300 text-red-800' 
                : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'}
            `}
          >
            <div className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${allergy.selected ? 'bg-red-500' : 'bg-gray-300'}`}></div>
            <span className="font-medium">{allergy.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllergenSelector;
