import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, LinkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal = ({ isOpen, onClose }: QRCodeModalProps) => {
  // Use window.location.origin to get the base URL
  const baseUrl = window.location.origin;
  const viewOnlyUrl = `${baseUrl}?view=only`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(viewOnlyUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
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
                    View Menu
                  </Dialog.Title>
                  <button 
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-xl shadow-md">
                      <QRCodeSVG
                        value={viewOnlyUrl}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Scan this QR code or use the link below to view the menu on your device
                    </p>
                    <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded-lg break-all">
                      {viewOnlyUrl}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={viewOnlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white 
                               bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Preview Menu
                    </a>
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 
                               bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copy Link
                    </button>
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