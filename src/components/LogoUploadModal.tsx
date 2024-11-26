import { Fragment, useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (logoUrl: string) => void;
}

export const LogoUploadModal = ({ isOpen, onClose, onSave }: LogoUploadModalProps) => {
  const [logoUrl, setLogoUrl] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    maxFiles: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (logoUrl) {
      onSave(logoUrl);
      setLogoUrl('');
    }
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                    Upload Restaurant Logo
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div
                      {...getRootProps()}
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 
                        border-dashed rounded-md cursor-pointer transition-colors duration-200
                        ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-500'}
                      `}
                    >
                      <div className="space-y-1 text-center">
                        <input {...getInputProps()} />
                        {logoUrl ? (
                          <div className="relative">
                            <img
                              src={logoUrl}
                              alt="Logo Preview"
                              className="mx-auto h-32 w-auto object-contain"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLogoUrl('');
                              }}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 
                                       hover:bg-red-700 transition-colors duration-200"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-red-600 hover:text-red-500">
                                Upload a file
                              </span>
                              {" or drag and drop"}
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF, SVG up to 5MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                               border border-gray-300 rounded-md hover:bg-gray-50 
                               focus:outline-none transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!logoUrl}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-md 
                                focus:outline-none transition-colors duration-200
                                ${logoUrl
                                  ? 'bg-red-600 hover:bg-red-700'
                                  : 'bg-gray-400 cursor-not-allowed'
                                }`}
                    >
                      Save Logo
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