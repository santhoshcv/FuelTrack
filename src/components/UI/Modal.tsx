import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const modalSizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`${modalSizeClass} w-full transform rounded-xl bg-white dark:bg-gray-800 shadow-xl transition-transform ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">{children}</div>
        
        {/* Footer */}
        {footer && (
          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;