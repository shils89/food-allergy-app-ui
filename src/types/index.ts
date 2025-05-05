export interface Allergen {
  id: string;
  name: string;
  description: string;
  commonFoods: string[];
  symptoms: string[];
}

export interface FoodPrediction {
  className: string;
  probability: number;
}

export interface UserAllergy {
  id: string;
  name: string;
  selected: boolean;
}
