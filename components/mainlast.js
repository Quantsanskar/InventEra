import React from "react";

const ContactFooter = () => {
    return (
        <footer className="relative bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 px-4 py-16">
            {/* Background blur effect */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-100 mix-blend-overlay"
                style={{
                    backgroundImage: "url('/reference/2140357.jpg')"
                }}
            />

            {/* Content container */}
            <div className="relative max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                    CONTACT INFORMATION
                </h2>

                {/* Register Now Window */}
                {/* <div className="bg-gray-900 rounded-[2rem] p-1.5 shadow-2xl mb-8">
                    <div className="bg-black p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black text-xl">Register Now!</span>
                        </div>
                        <ul className="space-y-4">
                            <li>
                                <span className="text-orange-500 font-bold">VISIT: </span>
                                <span className="text-white">[EVENT WEBSITE LINK OR QR CODE]</span>
                            </li>
                            <li>
                                <span className="text-orange-500 font-bold">EARLY-BIRD REGISTRATION ENDS </span>
                                <span className="text-white">[INSERT DATE].</span>
                            </li>
                        </ul>
                    </div>
                </div> */}

                {/* Contact Us Window */}
                <div className="bg-gray-900 rounded-[2rem] p-1.5 shadow-2xl mb-8">
                    <div className="bg-black p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black text-xl">Contact Us</span>
                        </div>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-orange-500 font-bold">EMAIL: </span>
                                <a href="mailto:BUILDERSSPACE9@GMAIL.COM" className="underline text-white">BUILDERSSPACE9@GMAIL.COM</a>
                            </li>
                            <li>
                                <span className="text-orange-500 font-bold">PHONE: </span>
                                <a href="tel:+917088963373" className="hover:underline text-white">+91 7088963373</a>
                            </li>
                            <li>
                                <span className="text-orange-500 font-bold">PHONE: </span>
                                <a href="tel:+918318458229" className="hover:underline text-white">+91 83184 58229</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Follow Us Window */}
                <div className="bg-gray-900 rounded-[2rem] p-1.5 shadow-2xl mb-8">
                    <div className="bg-black p-6 rounded-[1.85rem]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#24AA36]"></div>
                            </div>
                            <span className="font-bold text-black text-xl">Follow Us</span>
                        </div>
                        <p className="text-orange-500 font-bold mb-4">
                            STAY UPDATED WITH EVENT NEWS, SPEAKER ANNOUNCEMENTS, AND MORE
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://instagram.com/builders.space" className="hover:underline text-white">
                                    <span className="text-orange-500 font-bold">INSTAGRAM:</span> @BUILDERS.SPACE
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/builders_space9" className="hover:underline text-white">
                                    <span className="text-orange-500 font-bold">TWITTER</span>: @BUILDERS_SPACE9
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/company/builder-s-space" className="hover:underline text-white">
                                    <span className="text-orange-500 font-bold">LINKEDIN:</span> @BUILDER-S-SPACE
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;