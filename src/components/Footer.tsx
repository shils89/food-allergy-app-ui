import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} Food Allergy Detector</p>
            <p className="text-xs text-gray-400 mt-1">
              This app is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Made with</span>
            <Heart size={16} className="text-red-500" />
            <span className="text-sm ml-2">for food safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
