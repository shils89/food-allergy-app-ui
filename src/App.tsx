import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import AllergenSelector from './components/AllergenSelector';
import ResultsDisplay from './components/ResultsDisplay';
import AboutSection from './components/AboutSection';
import AllergenInfoSection from './components/AllergenInfoSection';
import { useImageClassification } from './hooks/useImageClassification';
import { allergens } from './data/allergens';
import { UserAllergy } from './types';
import { AlertCircle, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const {
    isLoading,
    predictions,
    imageUrl,
    error,
    classifyImage,
    resetClassification,
    isModelLoading
  } = useImageClassification();

  // Initialize user allergies from localStorage or default to all allergens unselected
  const [userAllergies, setUserAllergies] = useState<UserAllergy[]>(() => {
    const savedAllergies = localStorage.getItem('userAllergies');
    if (savedAllergies) {
      return JSON.parse(savedAllergies);
    }
    return allergens.map(allergen => ({
      id: allergen.id,
      name: allergen.name,
      selected: false
    }));
  });

  // Save user allergies to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userAllergies', JSON.stringify(userAllergies));
  }, [userAllergies]);

  // Toggle allergen selection
  const handleToggleAllergen = (id: string) => {
    setUserAllergies(prev => 
      prev.map(allergy => 
        allergy.id === id 
          ? { ...allergy, selected: !allergy.selected } 
          : allergy
      )
    );
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    resetClassification();
    await classifyImage(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section with upload */}
        <section className="bg-gradient-to-b from-green-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Check Your Food for Allergens
              </h1>
              <p className="text-xl text-gray-600">
                Upload a photo of your food and we'll analyze it for potential allergens.
                Quick, easy, and private - all processing happens in your browser.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {isModelLoading ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Loader2 size={48} className="animate-spin mx-auto text-green-500 mb-4" />
                  <p className="text-gray-700">Loading food recognition model...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a moment depending on your connection.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <ImageUploader 
                      onImageUpload={handleImageUpload} 
                      isLoading={isLoading}
                    />
                    
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                        <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}
                  </div>
                  
                  <AllergenSelector 
                    userAllergies={userAllergies}
                    onToggleAllergen={handleToggleAllergen}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Results section */}
        {(imageUrl || predictions.length > 0) && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <ResultsDisplay 
                  imageUrl={imageUrl} 
                  predictions={predictions}
                  userAllergies={userAllergies}
                />
              </div>
            </div>
          </section>
        )}
        
        {/* About section */}
        <AboutSection />
        
        {/* Allergen information section */}
        <AllergenInfoSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
