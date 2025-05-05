import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        {isDragActive ? (
          <ImageIcon size={48} className="text-green-500" />
        ) : (
          <Upload size={48} className="text-gray-400" />
        )}
        <div>
          {isLoading ? (
            <p className="text-gray-600">Analyzing image...</p>
          ) : isDragActive ? (
            <p className="text-green-600 font-medium">Drop your food image here</p>
          ) : (
            <div>
              <p className="text-gray-700 font-medium">Drag & drop a food photo here</p>
              <p className="text-gray-500 text-sm mt-1">or click to select a file</p>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Supported formats: JPEG, PNG, WebP
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
