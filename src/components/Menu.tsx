import { useState, useEffect } from 'react';
import { menuData, saveMenuData } from '../data/menuData';
import { MenuCategory } from './MenuCategory';
import { CategoryTabs } from './CategoryTabs';
import { Header } from './Header';
import { useSearchParams } from './useSearchParams';
import { MenuCategory as MenuCategoryType } from '../types/menu';
import { useAuth } from './Auth';
import { LoginModal } from './LoginModal';

export const Menu = () => {
  const [categories, setCategories] = useState<MenuCategoryType[]>(menuData.categories);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name || '');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isViewOnly } = useSearchParams();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isViewOnly && !isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  }, [isViewOnly, isAuthenticated]);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].name);
    }
  }, [categories]);

  const handleAddCategory = (categoryName: string) => {
    if (!categories.find(c => c.name === categoryName)) {
      const newCategory = { name: categoryName, items: [] };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      menuData.categories = updatedCategories;
      saveMenuData(menuData);
      setActiveCategory(categoryName);
    }
  };

  const handleRemoveCategory = (categoryName: string) => {
    if (categories.length <= 1) {
      alert('Cannot remove the last category');
      return;
    }
    
    const newCategories = categories.filter(c => c.name !== categoryName);
    setCategories(newCategories);
    menuData.categories = newCategories;
    saveMenuData(menuData);
    
    if (activeCategory === categoryName) {
      setActiveCategory(newCategories[0].name);
    }
  };

  const handleUpdateCategory = (updatedCategory: MenuCategoryType) => {
    const updatedCategories = categories.map(cat => 
      cat.name === updatedCategory.name ? updatedCategory : cat
    );
    setCategories(updatedCategories);
    menuData.categories = updatedCategories;
    saveMenuData(menuData);
  };

  const currentCategory = categories.find(
    category => category.name === activeCategory
  );

  const showEditMode = !isViewOnly && isAuthenticated;

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Categories Available</h1>
          <p className="text-gray-600">Please add a category to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white">
        {showEditMode && <Header />}

        {/* Category tabs with shadow for depth */}
        <div className="border-t border-gray-200 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onAddCategory={handleAddCategory}
              onRemoveCategory={handleRemoveCategory}
              isViewOnly={!showEditMode}
            />
          </div>
        </div>
      </div>

      {/* Main content with padding to account for fixed header */}
      <div 
        className={`pt-${showEditMode ? '32' : '20'} pb-8 transition-all duration-300`}
        style={{ 
          paddingTop: showEditMode ? '8rem' : '5rem',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {currentCategory && (
              <MenuCategory 
                key={currentCategory.name}
                category={currentCategory} 
                isViewOnly={!showEditMode}
                onUpdateCategory={handleUpdateCategory}
              />
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};