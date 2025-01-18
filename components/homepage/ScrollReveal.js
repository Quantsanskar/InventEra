"use client";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";

export default function ScrollReveal() {
return (
    <div className="min-h-[200vh] bg-gray-800 w-full relative">
        <div className=" inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-5xl mx-auto p-4">
                <div>
                    <TextRevealByWord
                        text="Hey. This is a quick read. We killed a $1.5m biz. In 2023 we grew huge. Said no to a $2m gov deal. Aiming higher in 2024."
                    />
                </div>
            </div>
        </div>


    </div>
);
}
