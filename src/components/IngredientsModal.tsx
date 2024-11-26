import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MenuItem } from '../types/menu';

interface IngredientsModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IngredientsModal = ({ item, isOpen, onClose }: IngredientsModalProps) => {
  if (!item) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </Dialog.Title>
                  <button 
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {item.imageUrl && (
                    <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Ingredients</h4>
                    {item.ingredients && item.ingredients.length > 0 ? (
                      <ul className="space-y-2">
                        {item.ingredients.map((ingredient, index) => (
                          <li 
                            key={index} 
                            className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg"
                          >
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic text-center py-4">
                        Ingredients information not available
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={onClose}
                      className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 
                               rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 
                               focus:ring-gray-300 transition-all duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};