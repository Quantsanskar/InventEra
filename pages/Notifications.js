"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import axios from "axios"
import Navigation from "@/components/homepage/Navigation"
import { Footer } from "@/components/footer"

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Create an axios instance with the auth token
  const getAuthenticatedAxios = () => {
    const token = localStorage.getItem("access_token")
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const authAxios = getAuthenticatedAxios()
        // Updated API endpoint to match backend
        const response = await authAxios.get("https://builderspace.onrender.com/api/get-notifications-user/")
        setNotifications(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch notifications")
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification)
    setShowModal(true)

    // Mark notification as read if it's not already read
    if (!notification.is_read) {
      try {
        const authAxios = getAuthenticatedAxios()
        // Updated API endpoint and payload to match backend
        await authAxios.patch("https://builderspace.onrender.com/api/mark-notification-read/", {
          notification_title: notification.notification_title
        })

        // Update the state to reflect the change
        setNotifications((prevNotifications) =>
          prevNotifications.map((item) =>
            item.notification_title === notification.notification_title ? { ...item, is_read: true } : item,
          ),
        )
      } catch (err) {
        console.error("Failed to mark notification as read:", err)
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navigation />
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
        />
      </Head>

      <style jsx global>{`
                body {
                    font-family: 'Manrope', sans-serif;
                    background-color: #121212;
                    color: #e1e1e1;
                }
            `}</style>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="border-b lg:mt-20 border-gray-700 pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">Notifications</h1>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 rounded-md p-4 text-red-400">{error}</div>
        ) : (
          <div className="space-y-1">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
                <p className="text-lg">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  onClick={() => handleNotificationClick(notification)}
                  className="flex items-start p-4 rounded-md hover:bg-gray-800 transition cursor-pointer border-b border-gray-800"
                >
                  <div
                    className={`h-2 w-2 mt-2 rounded-full flex-shrink-0 ${notification.is_read ? "opacity-0" : "bg-blue-500"}`}
                  ></div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3
                        className={`text-md ${notification.is_read ? "font-normal text-gray-400" : "font-semibold text-white"}`}
                      >
                        {notification.notification_title}
                      </h3>
                      <span className="text-xs text-gray-500">{formatDate(notification.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{notification.notification_message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {showModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white">{selectedNotification.notification_title}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="mb-4 text-sm text-gray-400">{formatDate(selectedNotification.timestamp)}</div>
              {selectedNotification.house && (
                <div className="mb-4 text-sm">
                  <span className="text-gray-400">House: </span>
                  <span className="text-gray-300">{selectedNotification.house}</span>
                </div>
              )}
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-line">{selectedNotification.notification_message}</p>
              </div>
            </div>
            <div className="border-t border-gray-700 px-6 py-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

