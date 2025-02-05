import React from 'react';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
            {/* Animated glowing circle background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Main content container */}
            <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
                {/* Error number with gradient */}
                <h1 className="text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                    404
                </h1>

                {/* Alert icon */}
                <div className="mb-8 flex justify-center">
                    <AlertCircle size={48} className="text-purple-400" />
                </div>

                {/* Error message */}
                <h2 className="text-3xl font-semibold mb-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-400 mb-8 text-lg">
                    We're working on something amazing! This page is currently under construction and will be available soon.
                </p>

                {/* Coming soon badge */}
                <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full mb-8 border border-purple-500/20">
                    <span className="text-purple-400 font-semibold">
                        Coming Soon
                    </span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/20" onClick={() => window.history.back()}>
                        <Home size={20} />
                        <span>Back</span>
                    </button>

                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600" onClick={() => window.location.reload()}>
                        <RefreshCcw size={20} />
                        <span>Try Again</span>
                    </button>
                </div>
            </div>

            {/* Bottom text */}
            <div className="relative z-10 mt-16 text-gray-500">
                <p>© 2025 Your Company. All rights reserved.</p>
            </div>
        </div>
    );
};

export default NotFoundPage;