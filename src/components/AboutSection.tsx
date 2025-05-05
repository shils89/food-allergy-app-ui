import React from 'react';
import { AlertTriangle, Info, Shield } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Food Allergy Detector</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Info size={24} className="text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">How It Works</h3>
            </div>
            <p className="text-gray-600">
              Our app uses advanced image recognition technology to identify food in your photos. 
              It then cross-references the detected food with common allergens to provide you with 
              personalized risk assessment based on your specific allergies.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Shield size={24} className="text-green-500 mr-2" />
              <h3 className="text-xl font-semibold">Privacy First</h3>
            </div>
            <p className="text-gray-600">
              Your privacy matters to us. All image processing happens directly in your browser - 
              we don't store your food photos on any server. Your allergy preferences are saved 
              locally on your device for convenience.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-amber-500 mr-2" />
              <h3 className="text-xl font-semibold">Important Disclaimer</h3>
            </div>
            <p className="text-gray-600">
              This app is designed as a helpful tool, not a replacement for medical advice. 
              If you have severe allergies, always verify ingredients directly and consult 
              with healthcare professionals about managing your allergies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
