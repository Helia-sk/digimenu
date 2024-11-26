import { Menu } from '../types/menu';

// Default menu data with initial categories and items
const defaultMenuData: Menu = {
  categories: [
    {
      name: "Appetizers",
      items: [
        {
          name: "Garlic Bread",
          price: 5.99,
          description: "Toasted bread with garlic butter",
          imageUrl: "https://images.unsplash.com/photo-1619535860434-ba1d8fc7b1ff?w=300",
          ingredients: ["French Bread", "Garlic", "Butter", "Parsley", "Sea Salt"]
        }
      ]
    },
    {
      name: "Main Course",
      items: [
        {
          name: "Grilled Salmon",
          price: 24.99,
          description: "Fresh salmon with herbs",
          imageUrl: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=300",
          ingredients: ["Atlantic Salmon", "Lemon", "Fresh Dill", "Garlic", "Olive Oil"]
        }
      ]
    }
  ]
};

// Load initial data from localStorage or use default data
const loadMenuData = (): Menu => {
  try {
    const savedData = localStorage.getItem('menuData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Validate the data structure
      if (parsedData?.categories?.length > 0) {
        return parsedData;
      }
    }
  } catch (error) {
    console.error('Error loading menu data:', error);
  }
  return defaultMenuData;
};

// Export the loaded menu data
export const menuData: Menu = loadMenuData();

// Helper function to save menu data
export const saveMenuData = (data: Menu) => {
  try {
    localStorage.setItem('menuData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving menu data:', error);
  }
};