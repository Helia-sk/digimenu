import { Fragment, useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { MenuItem } from '../types/menu';

interface EditMenuItemModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedItem: MenuItem) => void;
}

export const EditMenuItemModal = ({ item, isOpen, onClose, onSave }: EditMenuItemModalProps) => {
  const [formData, setFormData] = useState({
    name: item.name,
    price: item.price.toString(),
    description: item.description,
    imageUrl: item.imageUrl || '',
    ingredients: item.ingredients?.join(', ') || '',
    imageFile: null as File | null
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      imageUrl: formData.imageUrl,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean)
    });
  };

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
                    Edit Menu Item
                  </Dialog.Title>
                  <button 
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 
                               focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (€)</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 
                               focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 
                               focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <div
                      {...getRootProps()}
                      className={`
                        mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg 
                        cursor-pointer transition-all duration-200 group
                        ${isDragActive 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 hover:border-red-500 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="space-y-2 text-center">
                        <input {...getInputProps()} />
                        {formData.imageUrl ? (
                          <div className="relative inline-block">
                            <img
                              src={formData.imageUrl}
                              alt="Preview"
                              className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md 
                                       transition-transform duration-200 group-hover:scale-105"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({ ...formData, imageUrl: '', imageFile: null });
                              }}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 
                                       hover:bg-red-700 shadow-lg transition-all duration-200 hover:scale-110"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-red-600 hover:text-red-500">
                                Upload a file
                              </span>
                              {" or drag and drop"}
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ingredients (comma-separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ingredients}
                      onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 
                               focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white 
                               border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none 
                               focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 
                               rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 
                               focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 
                               shadow-sm hover:shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};