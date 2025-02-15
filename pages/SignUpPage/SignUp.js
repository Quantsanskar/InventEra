import React from 'react';
const SignUpPage = () => {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/images/signupgradient.png')] bg-center opacity-60"></div>
            <div className="relative z-10">
                <h1 className="text-[104px] font-black text-center mb-4 animated-text uppercase stroke-text tracking-wide">
                    Sign Up
                </h1>

                <div className="bg-black border border-[#495057] rounded-[24px] p-8 py-20 px-16 w-full max-w-xl backdrop-blur-sm shadow-[0_0_20px_rgba(162,210,255,0.10)]">

                    <form className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="FIRST NAME"
                                    className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"

                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="LAST NAME"
                                    className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"

                                />
                            </div>
                        </div>

                        <input
                            type="email"
                            placeholder="EMAIL"
                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"

                        />

                        <input
                            type="password"
                            placeholder="PASSWORD"
                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"

                        />

                        <input
                            type="password"
                            placeholder="CONFIRM PASSWORD"
                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"

                        />

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="w-full max-w-[40%] bg-black/25 border-2 border-[#03045E] rounded-[53px] px-6 py-2 text-gray-300 
                focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                hover:scale-105 hover:text-white
                transition-all duration-300 ease-in-out
                hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30"
                            >
                                SIGN UP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
