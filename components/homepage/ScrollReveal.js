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
                            text={`Okay, so...what is this?\n
We’re Builder’s Space — a platform where anyone from tech wizards to paintbrush-wielding maniacs can build, showcase, and share their wildest ideas. It’s like Hogwarts for creators but with fewer owls and more memes.\n
Whether you’re coding a groundbreaking app, directing a short film, crafting a new Michelin-star recipe, or creating the next viral dance trend—this is where you belong.\n
Oh, and did we mention? No degrees. No boring lectures. Just you, your passion, and a gang of equally ambitious misfits.`}
                        />

                    </div>
                </div>
            </div>


        </div>
    );
}
