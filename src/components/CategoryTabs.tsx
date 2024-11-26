import { useState, useRef, useEffect } from 'react';
import { MenuCategory } from '../types/menu';
import { PlusIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CreateCategoryModal } from './CreateCategoryModal';

interface CategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryName: string) => void;
  onAddCategory: (categoryName: string) => void;
  onRemoveCategory: (categoryName: string) => void;
  isViewOnly?: boolean;
}

export const CategoryTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  onAddCategory,
  onRemoveCategory,
  isViewOnly = false
}: CategoryTabsProps) => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const handleDeleteClick = (categoryName: string) => {
    setCategoryToDelete(categoryName);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      onRemoveCategory(categoryToDelete);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="relative py-2">
      <div className="flex items-center">
        {/* Left scroll button */}
        {showScrollButtons && (
          <div 
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white to-transparent pl-2 pr-4 py-2
                       transition-opacity duration-200 ${showLeftShadow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-full bg-white shadow-md text-gray-600 hover:text-red-600 
                       transition-all duration-200 hover:shadow-lg"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Scrollable categories container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-hide py-1 px-2 flex items-center gap-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group flex-shrink-0"
              onMouseEnter={() => !isViewOnly && setHoveredCategory(category.name)}
              onMouseLeave={() => !isViewOnly && setHoveredCategory(null)}
            >
              <button
                onClick={() => onCategoryChange(category.name)}
                className={`
                  px-6 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-300
                  ${activeCategory === category.name
                    ? 'bg-red-600 text-white shadow-md transform scale-102'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                  }
                  group-hover:shadow-md
                `}
              >
                {category.name}
              </button>
              {!isViewOnly && hoveredCategory === category.name && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(category.name);
                  }}
                  className="absolute -right-1 -top-1 p-1 bg-white rounded-full shadow-md text-gray-400 
                           hover:text-red-600 transition-colors transform hover:scale-110
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {showScrollButtons && (
          <div 
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white to-transparent pr-2 pl-4 py-2
                       transition-opacity duration-200 ${showRightShadow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-full bg-white shadow-md text-gray-600 hover:text-red-600 
                       transition-all duration-200 hover:shadow-lg"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Add category button */}
        {!isViewOnly && (
          <div className="flex-shrink-0 pl-2">
            <button
              onClick={() => setIsCreateCategoryOpen(true)}
              className="p-2.5 text-sm font-medium text-gray-600 hover:text-red-600 
                       bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300
                       flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Add Category</span>
            </button>
          </div>
        )}
      </div>

      <CreateCategoryModal
        isOpen={isCreateCategoryOpen}
        onClose={() => setIsCreateCategoryOpen(false)}
        onSave={onAddCategory}
      />

      {/* Delete Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCategoryToDelete(null)} />
            
            <div className="relative transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all max-w-lg w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Category
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{categoryToDelete}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCategoryToDelete(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
                           rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                           rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};