import { Allergen } from '../types';

export const allergens: Allergen[] = [
  {
    id: 'peanut',
    name: 'Peanuts',
    description: 'Peanuts are one of the most common food allergens and can cause severe reactions.',
    commonFoods: ['peanut butter', 'mixed nuts', 'some Asian dishes', 'some cookies', 'some candy bars'],
    symptoms: ['Skin reactions', 'Digestive problems', 'Respiratory symptoms', 'Anaphylaxis']
  },
  {
    id: 'treenut',
    name: 'Tree Nuts',
    description: 'Tree nuts include walnuts, almonds, hazelnuts, cashews, pistachios, and Brazil nuts.',
    commonFoods: ['mixed nuts', 'nut butters', 'baked goods', 'cereals', 'energy bars'],
    symptoms: ['Abdominal pain', 'Difficulty swallowing', 'Nasal congestion', 'Shortness of breath']
  },
  {
    id: 'milk',
    name: 'Milk',
    description: 'Milk allergy is one of the most common food allergies in children.',
    commonFoods: ['dairy products', 'butter', 'cheese', 'yogurt', 'ice cream', 'some baked goods'],
    symptoms: ['Hives', 'Wheezing', 'Vomiting', 'Digestive problems']
  },
  {
    id: 'egg',
    name: 'Eggs',
    description: 'Egg allergies are common in children but can affect anyone.',
    commonFoods: ['mayonnaise', 'baked goods', 'some pasta', 'some sauces', 'some vaccines'],
    symptoms: ['Skin inflammation', 'Digestive distress', 'Respiratory problems', 'Anaphylaxis']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    description: 'Wheat allergy is different from celiac disease but can cause similar symptoms.',
    commonFoods: ['bread', 'pasta', 'cereals', 'baked goods', 'some sauces'],
    symptoms: ['Swelling or itching of the mouth', 'Hives', 'Headaches', 'Digestive distress']
  },
  {
    id: 'soy',
    name: 'Soy',
    description: 'Soy allergies are common in infants and children.',
    commonFoods: ['tofu', 'soy milk', 'soy sauce', 'some vegetarian products', 'some processed foods'],
    symptoms: ['Tingling in the mouth', 'Hives', 'Swelling', 'Digestive problems']
  },
  {
    id: 'fish',
    name: 'Fish',
    description: 'Fish allergies can develop at any age and are usually lifelong.',
    commonFoods: ['fish', 'some Asian cuisines', 'Caesar dressing', 'Worcestershire sauce'],
    symptoms: ['Hives or skin rash', 'Nausea', 'Headaches', 'Anaphylaxis']
  },
  {
    id: 'shellfish',
    name: 'Shellfish',
    description: 'Shellfish allergies are common and can be severe.',
    commonFoods: ['shrimp', 'crab', 'lobster', 'some Asian cuisines', 'some seafood restaurants'],
    symptoms: ['Hives', 'Swelling', 'Wheezing', 'Digestive problems', 'Anaphylaxis']
  },
  {
    id: 'sesame',
    name: 'Sesame',
    description: 'Sesame allergies are becoming increasingly common.',
    commonFoods: ['tahini', 'hummus', 'some breads', 'some Asian foods', 'some snack foods'],
    symptoms: ['Difficulty breathing', 'Coughing', 'Itchy throat', 'Vomiting']
  }
];

// Food keywords that might indicate the presence of common allergens
export const allergenKeywords: Record<string, string[]> = {
  peanut: ['peanut', 'peanuts', 'goober', 'groundnut', 'arachis', 'nut'],
  treenut: ['almond', 'walnut', 'hazelnut', 'cashew', 'pistachio', 'pecan', 'nut', 'nuts', 'macadamia'],
  milk: ['milk', 'dairy', 'cheese', 'butter', 'cream', 'yogurt', 'whey', 'casein', 'lactose'],
  egg: ['egg', 'eggs', 'mayonnaise', 'mayo', 'meringue', 'albumin'],
  wheat: ['wheat', 'bread', 'flour', 'pasta', 'cereal', 'bran', 'gluten'],
  soy: ['soy', 'soya', 'tofu', 'edamame', 'miso', 'tempeh'],
  fish: ['fish', 'cod', 'salmon', 'tuna', 'tilapia', 'bass', 'trout', 'seafood'],
  shellfish: ['shellfish', 'shrimp', 'crab', 'lobster', 'prawn', 'crayfish', 'seafood', 'clam', 'mussel', 'oyster'],
  sesame: ['sesame', 'tahini', 'benne', 'gingelly', 'til']
};

// Function to check if a food might contain an allergen based on keywords
export const mightContainAllergen = (foodName: string, allergenId: string): boolean => {
  const keywords = allergenKeywords[allergenId] || [];
  return keywords.some(keyword => 
    foodName.toLowerCase().includes(keyword.toLowerCase())
  );
};
