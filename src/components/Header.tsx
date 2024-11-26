import { useState } from 'react';
import { QRCodeModal } from './QRCodeModal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { LogoUploadModal } from './LogoUploadModal';

export const Header = () => {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoSave = (logoUrl: string) => {
    setLogo(logoUrl);
    setIsLogoModalOpen(false);
  };

  const handleDeleteLogo = () => {
    setLogo(null);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-20 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center relative group">
          {logo ? (
            <div className="relative">
              <img
                src={logo}
                alt="Restaurant Logo"
                className="h-10 w-auto object-contain"
              />
              <button
                onClick={handleDeleteLogo}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md 
                         text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 
                         transition-all duration-200"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLogoModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 
                       hover:bg-gray-100 rounded-lg transition-colors duration-300 
                       border border-gray-200 hover:border-gray-300"
            >
              Upload Logo
            </button>
          )}
        </div>
        
        <button
          onClick={() => setIsQRCodeOpen(true)}
          className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg 
                   hover:bg-red-700 transition-colors duration-300 ease-in-out 
                   shadow-sm hover:shadow-md active:transform active:scale-95"
        >
          View QR Code
        </button>

        <QRCodeModal
          isOpen={isQRCodeOpen}
          onClose={() => setIsQRCodeOpen(false)}
        />

        <LogoUploadModal
          isOpen={isLogoModalOpen}
          onClose={() => setIsLogoModalOpen(false)}
          onSave={handleLogoSave}
        />
      </div>
    </header>
  );
};