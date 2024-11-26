import { useState } from 'react';
import { MenuItem as MenuItemType } from '../types/menu';
import { IngredientsModal } from './IngredientsModal';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { EditMenuItemModal } from './EditMenuItemModal';

interface MenuItemProps {
  item: MenuItemType;
  isViewOnly?: boolean;
  onDelete?: (item: MenuItemType) => void;
  onEdit?: (oldItem: MenuItemType, newItem: MenuItemType) => void;
}

export const MenuItem = ({ item, isViewOnly = false, onDelete, onEdit }: MenuItemProps) => {
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmDelete(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(item);
    }
    setIsConfirmDelete(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editedItem: MenuItemType) => {
    if (onEdit) {
      onEdit(item, editedItem);
    }
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div 
        className="group relative bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden 
                   flex flex-col sm:flex-row mb-4 transition-all duration-300 ease-in-out 
                   transform hover:scale-[1.02] cursor-pointer border border-gray-100"
        onClick={() => setIsIngredientsOpen(true)}
      >
        {!isViewOnly && (
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              onClick={handleEdit}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-gray-600 
                       hover:text-red-600 opacity-0 group-hover:opacity-100 
                       transition-all duration-200 hover:scale-110"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-gray-600 
                       hover:text-red-600 opacity-0 group-hover:opacity-100 
                       transition-all duration-200 hover:scale-110"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {item.imageUrl && (
          <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 relative overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 
                       group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
              {item.name}
            </h3>
            <span className="text-lg font-bold text-red-600 whitespace-nowrap">
              €{item.price.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click for ingredients
            </span>
          </div>
        </div>
      </div>

      <IngredientsModal
        item={item}
        isOpen={isIngredientsOpen}
        onClose={() => setIsIngredientsOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      {isConfirmDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsConfirmDelete(false)} />
            
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Delete Menu Item
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete "{item.name}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm 
                           font-semibold text-white shadow-sm hover:bg-red-700 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmDelete(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm 
                           font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                           hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <EditMenuItemModal
        item={item}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
      />
    </>
  );
};