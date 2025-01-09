import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Menu } from 'lucide-react';

const RegisLoginAI = () => {
    const [searchText, setSearchText] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const carouselRef = useRef(null);

    // Sample data for the carousel
    const mediaItems = [
        { id: 1, image: '/image1.png' },
        { id: 2, image: '/image1.png' },
        { id: 3, image: '/image1.png' },
        { id: 4, image: '/image1.png' },
        { id: 5, image: '/image1.png' }
    ];

    useEffect(() => {
        const slider = carouselRef.current;
        let intervalId;

        const scroll = () => {
            if (slider) {
                const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                if (slider.scrollLeft >= maxScrollLeft) {
                    slider.scrollLeft = 0;
                } else {
                    slider.scrollLeft += 1;
                }
            }
        };

        intervalId = setInterval(scroll, 20);

        const handleMouseEnter = () => clearInterval(intervalId);
        const handleMouseLeave = () => {
            intervalId = setInterval(scroll, 20);
        };

        slider?.addEventListener('mouseenter', handleMouseEnter);
        slider?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(intervalId);
            slider?.removeEventListener('mouseenter', handleMouseEnter);
            slider?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const MediaCard = ({ item }) => (
        <div className="w-64 sm:w-72 mx-3 inline-block flex-none">
            <div className="bg-zinc-800 rounded-xl overflow-hidden transition-transform hover:scale-105">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 sm:h-80 object-cover"
                />
            </div>
        </div>
    );


    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header - Mobile */}
            <header className="lg:hidden fixed top-0 w-full bg-zinc-900/80 backdrop-blur-sm z-50 px-6 py-4 flex justify-between items-center">
                <div className="h-6 sm:h-8">
                    <img src="/logo.jpg" className="h-full w-auto object-contain" />
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-zinc-800 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar */}
                <div className={`
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 
                    fixed lg:relative 
                    w-4/5 sm:w-2/3 lg:w-1/4 
                    h-screen 
                    bg-zinc-900 
                    p-6 sm:p-8
                    flex 
                    flex-col 
                    justify-between 
                    transition-transform 
                    duration-300 
                    ease-in-out
                    z-40
                `}>
                    <div className="space-y-6 sm:space-y-8">
                        <div className="h-8 sm:h-10 hidden lg:block">
                            <img src="/logo.jpg" className="h-full w-auto object-contain" />
                        </div>
                        <div className="text-center mb-12">
                            <p className="text-xl font-medium mt-16">Welcome to</p>
                            <p className="text-3xl sm:text-4xl font-extrabold text-primary mt-2">'The Nights'</p>
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base">
                            A place to find dope people building cool shit.
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base">
                            This is the place where people work on ideas they are passionate about.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <button className="w-full bg-white text-black py-2 sm:py-3 px-6 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 transition">
                            Sign In
                        </button>
                        <button className="w-full bg-zinc-800 text-white py-2 sm:py-3 px-6 rounded-lg text-sm sm:text-base font-medium hover:bg-zinc-700 transition">
                            Register
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-grow lg:w-3/4 pt-16 lg:pt-0 px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Carousel */}
                        <div className="relative overflow-hidden rounded-xl mt-8 sm:mt-10">
                            <div
                                ref={carouselRef}
                                className="overflow-x-hidden whitespace-nowrap py-4"
                            >
                                {[...mediaItems, ...mediaItems].map((item, index) => (
                                    <MediaCard key={`${item.id}-${index}`} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* Search Section */}
                        <div>
                            <h2 className="text-4xl sm:text-6xl font-bold text-center mb-6 sm:mb-10 mt-8 sm:mt-10">Find and Be Found</h2>
                            <div className="max-w-xl mx-auto relative">
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Find or Ask AI..."
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 sm:py-3 px-4 pr-10 text-base sm:text-lg focus:outline-none focus:border-zinc-600"
                                />
                                <ChevronRight className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default RegisLoginAI;