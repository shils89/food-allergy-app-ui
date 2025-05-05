import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { FoodPrediction } from '../types';

export const useImageClassification = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [predictions, setPredictions] = useState<FoodPrediction[]>([]);
  const [isClassifying, setIsClassifying] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load the model on component mount
  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        // Make sure TensorFlow.js is ready
        await tf.ready();
        // Load MobileNet model
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        setError(null);
      } catch (err) {
        console.error('Failed to load model:', err);
        setError('Failed to load the image recognition model. Please try refreshing the page.');
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModel();

    // Cleanup function
    return () => {
      // Dispose of any tensors when component unmounts
      if (model) {
        // Note: mobilenet doesn't have a direct dispose method, but we can clean up any hanging tensors
        tf.disposeVariables();
      }
    };
  }, []);

  // Function to classify an image
  const classifyImage = useCallback(async (file: File) => {
    if (!model) {
      setError('Model not loaded yet. Please wait and try again.');
      return;
    }

    setIsClassifying(true);
    setPredictions([]);
    setError(null);

    try {
      // Create an image URL for display
      const imageObjectUrl = URL.createObjectURL(file);
      setImageUrl(imageObjectUrl);

      // Create an HTML image element for the model
      const img = new Image();
      img.src = imageObjectUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Classify the image
      const result = await model.classify(img, 5); // Get top 5 predictions
      
      // Format the results
      const formattedResults: FoodPrediction[] = result.map(item => ({
        className: item.className,
        probability: item.probability
      }));
      
      setPredictions(formattedResults);
    } catch (err) {
      console.error('Error classifying image:', err);
      setError('Failed to analyze the image. Please try a different photo.');
    } finally {
      setIsClassifying(false);
    }
  }, [model]);

  // Function to reset the state
  const resetClassification = useCallback(() => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl(null);
    setPredictions([]);
    setError(null);
  }, [imageUrl]);

  return {
    isModelLoading,
    isClassifying,
    predictions,
    imageUrl,
    error,
    classifyImage,
    resetClassification,
    isLoading: isModelLoading || isClassifying
  };
};
