"use client"

import { useState } from 'react'
import Image from 'next/image'

const events = [
    {
        id: 1,
        title: "kickoff:",
        subtitle: "The process of ideation",
        date: "7TH MAR",
    },
    {
        id: 2,
        title: "session 1:",
        subtitle: "short description",
        date: "17TH MAR",
    },
    {
        id: 3,
        title: "session 2:",
        subtitle: "short description",
        date: "21ST MAR",
    },
    {
        id: 4,
        title: "session 3:",
        subtitle: "short description",
        date: "23RD MAR",
    },
    {
        id: 5,
        title: "session 4:",
        subtitle: "short description",
        date: "25TH MAR",
    },
    {
        id: 6,
        title: "session 4:",
        subtitle: "short description",
        date: "27TH MAR",
    },
    {
        id: 7,
        title: "kickoff:",
        subtitle: "The process of ideation",
        date: "7TH MAR",
    },
    {
        id: 8,
        title: "session 1:",
        subtitle: "short description",
        date: "17TH MAR",
    },
    {
        id: 9,
        title: "session 2:",
        subtitle: "short description",
        date: "21ST MAR",
    },
    {
        id: 10,
        title: "session 3:",
        subtitle: "short description",
        date: "23RD MAR",
    },
    {
        id: 11,
        title: "session 4:",
        subtitle: "short description",
        date: "25TH MAR",
    },
    {
        id: 12,
        title: "session 4:",
        subtitle: "short description",
        date: "27TH MAR",
    },
]

const importantLinks = [
    {
        title: "LUMA",
        date: "15TH MAR",
    },
    {
        title: "REGISTRATION",
        date: "15TH MAR",
    },
    {
        title: "FORM 3",
        date: "15TH MAR",
    },
]

export default function EventsPage() {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (event) => {
        setSelectedEvent(event)
        setIsModalOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setIsModalOpen(false)
        document.body.style.overflow = 'auto'
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <section>
                    <h2 className="text-zinc-500 mb-6">Upcoming Events</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="border border-zinc-800 bg-black p-4 cursor-pointer hover:border-zinc-700 transition-colors"
                                style={{ backgroundImage: "url('/images/eventsbg.png')" }}
                                onClick={() => openModal(event)}
                            >

                                <h3 className="text-white text-sm font-medium">{event.title}</h3>
                                <p className="text-zinc-400 text-sm">{event.subtitle}</p>
                                <p className="text-zinc-500 text-xs mt-2">{event.date}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-zinc-500 mb-6">Important Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {importantLinks.map((link, index) => (
                            <div
                                key={index}
                                className="border border-zinc-800 bg-black p-6 cursor-pointer hover:border-zinc-700 transition-colors"
                            >
                                <div className="mb-4">
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Logo"
                                        width={32}
                                        height={32}
                                        className="invert"
                                    />
                                </div>
                                <h3 className="text-white text-xl font-medium">{link.title}</h3>
                                <p className="text-zinc-500 text-sm mt-2">{link.date}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="relative bg-black border border-zinc-800 text-white max-w-md w-full rounded-lg overflow-hidden">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white z-10"
                            onClick={closeModal}
                        >
                            ×
                        </button>

                        {/* Banner image */}
                        <div className="relative h-40 bg-gradient-to-r from-[#2d2a20] to-black">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-[60px] border-t-transparent border-l-[120px] border-l-[#e9e1a8] border-b-[60px] border-b-transparent opacity-80"></div>
                                <Image
                                    src="/placeholder.svg"
                                    alt="Projector"
                                    width={80}
                                    height={80}
                                    className="absolute right-20"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Lab #{selectedEvent?.id} : {selectedEvent?.title} S1
                            </h2>

                            <div className="space-y-2 text-sm text-zinc-400">
                                <p>Sat Mar 15th | Timing :</p>
                                <p>Builder's Space</p>
                                <p className="text-zinc-500">Created by Anubhav</p>
                            </div>

                            <p className="mt-4 text-zinc-400">
                                Description goes here...
                            </p>

                            <div className="flex items-center gap-4 mt-6">
                                <button
                                    className="text-zinc-400 hover:text-zinc-300"
                                    onClick={closeModal}
                                >
                                    go back
                                </button>
                                <div className="flex-1 flex justify-end gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                                        JOIN NOW
                                    </button>
                                    <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 px-4 py-2 rounded">
                                        SHARE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
