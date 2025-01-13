import React from 'react';

const MacButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-6 py-2.5 bg-neutral-700 hover:bg-neutral-600 
    text-white font-medium text-sm leading-tight rounded-lg 
    shadow-md hover:shadow-lg transition duration-150 ease-in-out 
    border border-neutral-600 hover:border-neutral-500"
  >
    {children}
  </a>
);

const MacWindow = ({ children, title = 'Window' }) => {
  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg bg-neutral-900 shadow-2xl border border-neutral-700">
      {/* Window Header */}
      <div className="flex items-center px-4 py-2 bg-neutral-800 border-b border-neutral-700">
        {/* Traffic Light Buttons */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
        </div>
        
        {/* Window Title */}
        <div className="flex-1 text-center">
          <span className="text-sm text-neutral-400 font-medium">{title}</span>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="p-6 bg-neutral-900 text-neutral-100">
        {children}
      </div>
    </div>
  );
};

export { MacWindow as default, MacButton };