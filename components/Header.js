import React from 'react';
import Link from 'next/link';

const Header=()=> {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-10 
      bg-white/30 backdrop-blur-md 
      shadow-sm transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center h-16 items-center">
                    <div className="flex space-x-8">
                        <Link href="/" className="text-white hover:text-gray-200 font-medium">
                            Home
                        </Link>
                        {/* <Link href="/regisloginai" className="text-white hover:text-gray-200 font-medium">
                            Join Us
                        </Link> */}
                        <Link href="/thenights" className="text-white hover:text-gray-200 font-medium">
                            The Nights
                        </Link>
                        <Link href="/contact" className="text-white hover:text-gray-200 font-medium">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Header;