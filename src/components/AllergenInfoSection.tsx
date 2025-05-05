import React, { useState } from 'react';
import { allergens } from '../data/allergens';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AllergenInfoSection: React.FC = () => {
  const [expandedAllergen, setExpandedAllergen] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    if (expandedAllergen === id) {
      setExpandedAllergen(null);
    } else {
      setExpandedAllergen(id);
    }
  };
  
  return (
    <section id="allergens" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Common Food Allergens</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Learn about the most common food allergens, their symptoms, and where they're typically found.
          This information can help you make informed decisions about your diet.
        </p>
        
        <div className="max-w-4xl mx-auto">
          {allergens.map((allergen) => (
            <div 
              key={allergen.id}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer transition-colors
                  ${expandedAllergen === allergen.id ? 'bg-green-50' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => toggleExpand(allergen.id)}
              >
                <h3 className="text-lg font-medium">{allergen.name}</h3>
                {expandedAllergen === allergen.id ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </div>
              
              {expandedAllergen === allergen.id && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 mb-4">{allergen.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Commonly Found In:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {allergen.commonFoods.map((food, index) => (
                          <li key={index}>{food}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Common Symptoms:</h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {allergen.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllergenInfoSection;
