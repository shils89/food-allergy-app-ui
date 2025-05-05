import React from 'react';
import { FoodPrediction, UserAllergy } from '../types';
import { allergens, mightContainAllergen } from '../data/allergens';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface ResultsDisplayProps {
  imageUrl: string | null;
  predictions: FoodPrediction[];
  userAllergies: UserAllergy[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ imageUrl, predictions, userAllergies }) => {
  if (!imageUrl || predictions.length === 0) {
    return null;
  }

  // Get selected allergies
  const selectedAllergies = userAllergies.filter(a => a.selected);
  
  // Check if any of the predicted foods might contain allergens
  const allergyResults = selectedAllergies.map(allergy => {
    const allergenInfo = allergens.find(a => a.id === allergy.id);
    const matchingPredictions = predictions
      .filter(pred => mightContainAllergen(pred.className, allergy.id))
      .sort((a, b) => b.probability - a.probability);
    
    const hasRisk = matchingPredictions.length > 0;
    
    return {
      allergyId: allergy.id,
      allergyName: allergy.name,
      hasRisk,
      matchingFoods: matchingPredictions.map(p => p.className),
      info: allergenInfo
    };
  });

  const hasAnyRisk = allergyResults.some(result => result.hasRisk);
  const topPrediction = predictions[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image preview */}
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={imageUrl} 
                alt="Uploaded food" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Results */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Food Identification</h3>
              <p className="text-gray-700">
                We detected this is most likely: <span className="font-semibold">{topPrediction.className}</span> 
                <span className="text-gray-500 text-sm ml-2">
                  ({Math.round(topPrediction.probability * 100)}% confidence)
                </span>
              </p>
              
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-600 mb-1">Other possibilities:</h4>
                <ul className="text-sm text-gray-600">
                  {predictions.slice(1, 4).map((pred, index) => (
                    <li key={index} className="mb-1">
                      {pred.className} ({Math.round(pred.probability * 100)}%)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {selectedAllergies.length > 0 ? (
              <div>
                <h3 className="text-lg font-medium mb-3">Allergy Risk Assessment</h3>
                
                <div className={`p-4 rounded-md mb-4 ${hasAnyRisk ? 'bg-red-50' : 'bg-green-50'}`}>
                  {hasAnyRisk ? (
                    <div className="flex items-center">
                      <AlertTriangle size={20} className="text-red-500 mr-2" />
                      <p className="font-medium text-red-700">
                        Potential allergen detected! Exercise caution.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CheckCircle size={20} className="text-green-500 mr-2" />
                      <p className="font-medium text-green-700">
                        No allergens detected based on your selections.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {allergyResults.map((result) => (
                    <div 
                      key={result.allergyId}
                      className={`p-3 rounded-md border ${
                        result.hasRisk 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        {result.hasRisk ? (
                          <XCircle size={18} className="text-red-500 mr-2" />
                        ) : (
                          <CheckCircle size={18} className="text-green-500 mr-2" />
                        )}
                        <h4 className="font-medium">
                          {result.allergyName}
                        </h4>
                      </div>
                      
                      {result.hasRisk && (
                        <div className="mt-2 pl-6">
                          <p className="text-sm text-red-700">
                            This food may contain {result.allergyName.toLowerCase()}.
                          </p>
                          {result.matchingFoods.length > 0 && (
                            <p className="text-xs text-gray-600 mt-1">
                              Detected: {result.matchingFoods.join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-md flex items-start">
                <Info size={20} className="text-blue-500 mr-2 mt-0.5" />
                <p className="text-blue-700 text-sm">
                  Select your allergies in the panel above to get personalized risk assessment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 text-xs text-gray-500">
        <p>
          <strong>Disclaimer:</strong> This analysis is based on image recognition and keyword matching. 
          It is not a substitute for professional medical advice. Always verify ingredients if you have severe allergies.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
