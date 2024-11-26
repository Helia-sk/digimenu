import { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '../types/menu';
import { MenuItem } from './MenuItem';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CreateMenuModal } from './CreateMenuModal';
import { useState, useEffect } from 'react';
import { menuData, saveMenuData } from '../data/menuData';

interface MenuCategoryProps {
  category: MenuCategoryType;
  isViewOnly?: boolean;
  onUpdateCategory: (updatedCategory: MenuCategoryType) => void;
}

export const MenuCategory = ({ 
  category, 
  isViewOnly = false,
  onUpdateCategory 
}: MenuCategoryProps) => {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [items, setItems] = useState(category.items);

  useEffect(() => {
    setItems(category.items);
  }, [category]);

  const handleSave = (newItem: MenuItemType) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    
    const updatedCategory = {
      ...category,
      items: updatedItems
    };
    
    const categoryIndex = menuData.categories.findIndex(cat => cat.name === category.name);
    if (categoryIndex !== -1) {
      menuData.categories[categoryIndex] = updatedCategory;
      saveMenuData(menuData);
    }
    
    onUpdateCategory(updatedCategory);
    setIsCreateMenuOpen(false);
  };

  const handleDeleteItem = (itemToDelete: MenuItemType) => {
    const updatedItems = items.filter(item => item !== itemToDelete);
    setItems(updatedItems);
    
    const updatedCategory = {
      ...category,
      items: updatedItems
    };
    
    const categoryIndex = menuData.categories.findIndex(cat => cat.name === category.name);
    if (categoryIndex !== -1) {
      menuData.categories[categoryIndex] = updatedCategory;
      saveMenuData(menuData);
    }
    
    onUpdateCategory(updatedCategory);
  };

  const handleEditItem = (oldItem: MenuItemType, newItem: MenuItemType) => {
    const updatedItems = items.map(item => 
      item === oldItem ? newItem : item
    );
    setItems(updatedItems);
    
    const updatedCategory = {
      ...category,
      items: updatedItems
    };
    
    const categoryIndex = menuData.categories.findIndex(cat => cat.name === category.name);
    if (categoryIndex !== -1) {
      menuData.categories[categoryIndex] = updatedCategory;
      saveMenuData(menuData);
    }
    
    onUpdateCategory(updatedCategory);
  };

  const AddItemButton = () => (
    <button
      onClick={() => setIsCreateMenuOpen(true)}
      className="w-full py-4 mt-10 flex items-center justify-center text-gray-500 hover:text-gray-700 
                 hover:bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 
                 transition-all duration-300 group hover:border-red-300 hover:shadow-md"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 bg-gray-50 rounded-full group-hover:bg-red-50 
                      group-hover:text-red-600 transition-colors">
          <PlusIcon className="h-5 w-5" />
        </div>
        <span className="text-sm font-medium">Add Menu Item</span>
      </div>
    </button>
  );

  return (
    <div className="space-y-4">
      {!isViewOnly && <AddItemButton />}
      
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <MenuItem 
            key={`${category.name}-${item.name}-${index}`}
            item={item} 
            isViewOnly={isViewOnly}
            onDelete={!isViewOnly ? handleDeleteItem : undefined}
            onEdit={!isViewOnly ? handleEditItem : undefined}
          />
        ))}
      </div>
      
      {!isViewOnly && items.length > 0 && <AddItemButton />}

      <CreateMenuModal
        isOpen={isCreateMenuOpen}
        onClose={() => setIsCreateMenuOpen(false)}
        onSave={handleSave}
        categories={[category.name]}
      />
    </div>
  );
};