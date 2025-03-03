"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function AdminDashboard() {
  // State management
  const [activeTab, setActiveTab] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(true)
  const [users, setUsers] = useState([])
  const [participants, setParticipants] = useState([])
  const [attendees, setAttendees] = useState([])
  const [projects, setProjects] = useState([])
  const [votes, setVotes] = useState([])
  const [likes, setLikes] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState("")
  const [formData, setFormData] = useState({})
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalParticipants: 0,
    totalAttendees: 0,
    totalProjects: 0,
    totalVotes: 0,
    totalLikes: 0,
  })
  const [error, setError] = useState(null)

  const router = useRouter()

  // Fetch data on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    fetchData()
  }, [darkMode])

  // Fetch all data from API
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch users
      const usersResponse = await fetch("http://127.0.0.1:8000/api/users/")
      if (!usersResponse.ok) throw new Error("Failed to fetch users")
      const usersData = await usersResponse.json()
      setUsers(usersData)

      // Fetch participants
      const participantsResponse = await fetch("http://127.0.0.1:8000/api/participants")
      if (!participantsResponse.ok) throw new Error("Failed to fetch participants")
      const participantsData = await participantsResponse.json()
      setParticipants(participantsData)

      // Fetch attendees
      const attendeesResponse = await fetch("http://127.0.0.1:8000/api/attendees")
      if (!attendeesResponse.ok) throw new Error("Failed to fetch attendees")
      const attendeesData = await attendeesResponse.json()
      setAttendees(attendeesData)

      // Fetch projects
      const projectsResponse = await fetch("http://127.0.0.1:8000/api/projects")
      if (!projectsResponse.ok) throw new Error("Failed to fetch projects")
      const projectsData = await projectsResponse.json()
      setProjects(projectsData)

      // Fetch votes
      const votesResponse = await fetch("http://127.0.0.1:8000/api/votes")
      if (!votesResponse.ok) throw new Error("Failed to fetch votes")
      const votesData = await votesResponse.json()
      setVotes(votesData)

      // Fetch likes
      const likesResponse = await fetch("http://127.0.0.1:8000/api/likes")
      if (!likesResponse.ok) throw new Error("Failed to fetch likes")
      const likesData = await likesResponse.json()
      setLikes(likesData)

      // Fetch notifications
      const notificationsResponse = await fetch("http://127.0.0.1:8000/api/notifications")
      if (!notificationsResponse.ok) throw new Error("Failed to fetch notifications")
      const notificationsData = await notificationsResponse.json()
      setNotifications(notificationsData)

      // Set stats
      setStats({
        totalUsers: usersData.length,
        totalParticipants: participantsData.length,
        totalAttendees: attendeesData.length,
        totalProjects: projectsData.length,
        totalVotes: votesData.length,
        totalLikes: likesData.length,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error.message)
      // For demo purposes, set mock data
      setMockData()
    } finally {
      setLoading(false)
    }
  }

  // Set mock data for demonstration
  const setMockData = () => {
    const mockUsers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      email: `user${i + 1}@example.com`,
      first_name: `User ${i + 1}`,
      last_name: `Last ${i + 1}`,
      mobile_number: `+1234567890${i}`,
      is_participant: i % 3 === 0,
      is_attendee: i % 3 !== 0,
      is_active: true,
      date_joined: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    }))

    const mockParticipants = mockUsers
      .filter((user) => user.is_participant)
      .map((user) => ({
        user_id: user.id,
        user_email: user.email,
        user_name: `${user.first_name} ${user.last_name}`,
        house: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "Phoenix"][Math.floor(Math.random() * 5)],
        profile_picture: `/placeholder.svg?height=100&width=100`,
      }))

    const mockProjects = mockParticipants.map((participant) => ({
      participant_id: participant.user_id,
      participant_name: participant.user_name,
      project_idea_title: `Project ${participant.user_id}`,
      project_idea_description: `Description for project ${participant.user_id}`,
      project_experience: `Experience for project ${participant.user_id}`,
      project_video_link: `https://example.com/video${participant.user_id}`,
      votes: Math.floor(Math.random() * 50),
      likes: Math.floor(Math.random() * 100),
    }))

    const mockAttendees = mockUsers
      .filter((user) => user.is_attendee)
      .map((user) => ({
        user_id: user.id,
        user_email: user.email,
        user_name: `${user.first_name} ${user.last_name}`,
      }))

    const mockVotes = []
    mockAttendees.forEach((attendee) => {
      const randomProjects = [...mockProjects].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3))

      randomProjects.forEach((project) => {
        mockVotes.push({
          id: mockVotes.length + 1,
          attendee_id: attendee.user_id,
          attendee_name: attendee.user_name,
          project_id: project.participant_id,
          project_title: project.project_idea_title,
          timestamp: new Date(Date.now() - Math.random() * 10000000).toISOString(),
        })
      })
    })

    const mockLikes = []
    ;[...mockAttendees, ...mockParticipants].forEach((user) => {
      const randomProjects = [...mockProjects].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5))

      randomProjects.forEach((project) => {
        mockLikes.push({
          id: mockLikes.length + 1,
          user_id: user.user_id,
          user_name: user.user_name,
          user_type: mockAttendees.some((a) => a.user_id === user.user_id) ? "attendee" : "participant",
          project_id: project.participant_id,
          project_title: project.project_idea_title,
          timestamp: new Date(Date.now() - Math.random() * 10000000).toISOString(),
        })
      })
    })

    const mockNotifications = mockParticipants.map((participant, i) => ({
      id: i + 1,
      participant_id: participant.user_id,
      participant_name: participant.user_name,
      notification_title: `Notification ${i + 1}`,
      notification_message: `This is notification ${i + 1} for ${participant.user_name}`,
      house: participant.house,
      is_read: Math.random() > 0.5,
      timestamp: new Date(Date.now() - Math.random() * 10000000).toISOString(),
    }))

    setUsers(mockUsers)
    setParticipants(mockParticipants)
    setAttendees(mockAttendees)
    setProjects(mockProjects)
    setVotes(mockVotes)
    setLikes(mockLikes)
    setNotifications(mockNotifications)

    setStats({
      totalUsers: mockUsers.length,
      totalParticipants: mockParticipants.length,
      totalAttendees: mockAttendees.length,
      totalProjects: mockProjects.length,
      totalVotes: mockVotes.length,
      totalLikes: mockLikes.length,
    })
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Open modal with specific content
  const openModal = (type, data = null) => {
    setModalType(type)
    setFormData(data || {})
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setModalType("")
    setFormData({})
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      let endpoint = ""
      let method = "POST"
      const body = { ...formData }

      switch (modalType) {
        case "editUser":
          endpoint = `http://127.0.0.1:8000/api/update-user/`
          method = "PATCH"
          break
        case "createUser":
          endpoint = `http://127.0.0.1:8000/api/create-user-account/`
          method = "POST"
          break
        case "editProject":
          endpoint = `http://127.0.0.1:8000/api/update-project/`
          method = "PATCH"
          break
        case "editParticipant":
          endpoint = `http://127.0.0.1:8000/api/update-participant/`
          method = "PATCH"
          break
        case "createNotification":
          endpoint = "http://127.0.0.1:8000/api/participant-notification/"
          method = "POST"
          break
        case "updateSocialLinks":
          endpoint = "http://127.0.0.1:8000/api/update-social-links/"
          method = "PATCH"
          break
        default:
          throw new Error("Unknown form type")
      }

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit form")
      }

      closeModal()
      fetchData() // Refresh data
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error.message)
    }
  }

  // Delete a resource
  const handleDelete = async (type, id) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return
    setError(null)

    try {
      let endpoint = ""
      switch (type) {
        case "user":
          endpoint = `http://127.0.0.1:8000/api/users/${id}`
          break
        case "project":
          endpoint = `http://127.0.0.1:8000/api/projects/${id}`
          break
        case "vote":
          endpoint = `http://127.0.0.1:8000/api/votes/${id}`
          break
        case "notification":
          endpoint = `http://127.0.0.1:8000/api/notifications/${id}`
          break
        default:
          throw new Error(`Unknown resource type: ${type}`)
      }

      const response = await fetch(endpoint, { method: "DELETE" })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to delete ${type}`)
      }

      fetchData() // Refresh data
    } catch (error) {
      console.error(`Error deleting ${type}:`, error)
      setError(error.message)
    }
  }

  // Cast vote for a project
  const handleCastVote = async (projectId, attendeeId) => {
    setError(null)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cast-attendee-vote/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: projectId,
          attendee: attendeeId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to cast vote")
      }

      fetchData() // Refresh data
    } catch (error) {
      console.error("Error casting vote:", error)
      setError(error.message)
    }
  }

  // Like a project
  const handleLike = async (projectId, userId, userType) => {
    setError(null)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/post-like/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: projectId,
          [userType]: userId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to like project")
      }

      fetchData() // Refresh data
    } catch (error) {
      console.error("Error liking project:", error)
      setError(error.message)
    }
  }

  // Filter data based on search term
  const filterData = (data) => {
    if (!searchTerm) return data

    return data.filter((item) => {
      // Check common fields that might exist in different data types
      const searchableFields = [
        item.email,
        item.first_name,
        item.last_name,
        item.user_name,
        item.user_email,
        item.project_idea_title,
        item.notification_title,
        item.notification_message,
        item.house,
      ]

      return searchableFields.some((field) => field && field.toLowerCase().includes(searchTerm.toLowerCase()))
    })
  }

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Users</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
              <p className="text-gray-400">Total Users</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-gray-400">Participants</p>
              <p className="text-xl font-semibold text-white">{stats.totalParticipants}</p>
            </div>
            <div>
              <p className="text-gray-400">Attendees</p>
              <p className="text-xl font-semibold text-white">{stats.totalAttendees}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Projects</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
              <p className="text-gray-400">Total Projects</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 mb-1">Projects by House</p>
            <div className="space-y-2">
              {["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "Phoenix"].map((house) => {
                const count = participants.filter((p) => p.house === house).length
                const percentage = participants.length > 0 ? Math.round((count / participants.length) * 100) : 0

                return (
                  <div key={house} className="flex items-center">
                    <span className="text-xs text-gray-400 w-24">{house}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 mx-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Engagement</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
              <p className="text-gray-400 text-sm">Total Likes</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <p className="text-2xl font-bold text-white">{stats.totalVotes}</p>
              <p className="text-gray-400 text-sm">Total Votes</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 mb-2">Recent Activity</p>
            <div className="space-y-2">
              {[...votes, ...likes]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 3)
                .map((activity, i) => (
                  <div key={i} className="flex items-center text-sm">
                    {"attendee_name" in activity ? (
                      <span className="text-gray-300">
                        <span className="text-blue-400">{activity.attendee_name}</span> voted for{" "}
                        <span className="text-green-400">{activity.project_title}</span>
                      </span>
                    ) : (
                      <span className="text-gray-300">
                        <span className="text-blue-400">{activity.user_name}</span> liked{" "}
                        <span className="text-green-400">{activity.project_title}</span>
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render users table
  const renderUsers = () => {
    const filteredUsers = filterData(users)

    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Users Management</h3>
          <p className="text-gray-400 text-sm">View and manage all users in the system</p>
        </div>
        <div className="p-4">
          <div className="mb-4 flex justify-between">
            <div className="mb-0 max-w-md">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => openModal("createUser")}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
            >
              Add User
            </button>
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">{error}</div>}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.mobile_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.is_participant && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-blue-100">
                            Participant
                          </span>
                        )}
                        {user.is_attendee && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-green-100">
                            Attendee
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.is_active ? "bg-green-600 text-green-100" : "bg-red-600 text-red-100"}`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex space-x-2">
                          <button
                            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1"
                            onClick={() => openModal("editUser", user)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1"
                            onClick={() => handleDelete("user", user.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-300">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Render projects table
  const renderProjects = () => {
    const filteredProjects = filterData(projects)

    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Projects Management</h3>
          <p className="text-gray-400 text-sm">View and manage all projects in the system</p>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">{error}</div>}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Participant
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    House
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Votes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Likes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => {
                    const participant = participants.find((p) => p.user_id === project.participant_id)

                    return (
                      <tr key={project.participant_id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {project.project_idea_title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {project.participant_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {participant && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-600 text-gray-100">
                              {participant.house}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{project.votes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{project.likes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex space-x-2">
                            <button
                              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1"
                              onClick={() => openModal("editProject", project)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1"
                              onClick={() => {
                                setFormData(project)
                                setIsModalOpen(true)
                                setModalType("viewProject")
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-300">
                      No projects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Render votes table
  const renderVotes = () => {
    const filteredVotes = filterData(votes)

    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Votes Management</h3>
          <p className="text-gray-400 text-sm">View all votes in the system</p>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search votes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">{error}</div>}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Attendee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredVotes.length > 0 ? (
                  filteredVotes.map((vote) => (
                    <tr key={vote.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vote.attendee_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{vote.project_title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(vote.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1"
                          onClick={() => handleDelete("vote", vote.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-300">
                      No votes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Render notifications management
  const renderNotifications = () => {
    const filteredNotifications = filterData(notifications)

    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Notifications Management</h3>
          <p className="text-gray-400 text-sm">Send and manage notifications</p>
        </div>
        <div className="p-4">
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-0"
            />
            <button
              onClick={() => openModal("createNotification")}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
            >
              Send Notification
            </button>
          </div>

          {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">{error}</div>}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Recipient
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    House
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <tr key={notification.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {notification.notification_title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {notification.participant_name || "All"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-600 text-gray-100">
                          {notification.house}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${notification.is_read ? "bg-green-600 text-green-100" : "bg-yellow-600 text-yellow-100"}`}
                        >
                          {notification.is_read ? "Read" : "Unread"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1"
                          onClick={() => handleDelete("notification", notification.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-300">
                      No notifications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose}></div>

          <div className="relative bg-gray-800 rounded-lg max-w-lg w-full mx-auto shadow-xl z-10">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white focus:outline-none">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  // Render user edit form
  const renderUserForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-1">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-1">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-300 mb-1">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          value={formData.mobile_number || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {modalType === "createUser" && (
        <>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_participant"
                name="is_participant"
                checked={formData.is_participant || false}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
              />
              <label htmlFor="is_participant" className="ml-2 block text-sm text-gray-300">
                Participant
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_attendee"
                name="is_attendee"
                checked={formData.is_attendee || false}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
              />
              <label htmlFor="is_attendee" className="ml-2 block text-sm text-gray-300">
                Attendee
              </label>
            </div>
          </div>
        </>
      )}
      <div className="flex space-x-2 mt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  )

  // Render project edit form
  const renderProjectForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="project_idea_title" className="block text-sm font-medium text-gray-300 mb-1">
          Project Title
        </label>
        <input
          type="text"
          id="project_idea_title"
          name="project_idea_title"
          value={formData.project_idea_title || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="project_idea_description" className="block text-sm font-medium text-gray-300 mb-1">
          Project Description
        </label>
        <textarea
          id="project_idea_description"
          name="project_idea_description"
          value={formData.project_idea_description || ""}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="project_experience" className="block text-sm font-medium text-gray-300 mb-1">
          Project Experience
        </label>
        <textarea
          id="project_experience"
          name="project_experience"
          value={formData.project_experience || ""}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="project_video_link" className="block text-sm font-medium text-gray-300 mb-1">
          Video Link
        </label>
        <input
          type="text"
          id="project_video_link"
          name="project_video_link"
          value={formData.project_video_link || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  )

  // Render project view
  const renderProjectView = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-400">Project Title</h4>
        <p className="text-white">{formData.project_idea_title}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-400">Description</h4>
        <p className="text-white whitespace-pre-wrap">{formData.project_idea_description}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-400">Experience</h4>
        <p className="text-white whitespace-pre-wrap">{formData.project_experience}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-400">Video Link</h4>
        <a
          href={formData.project_video_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          {formData.project_video_link}
        </a>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-400">Stats</h4>
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span className="text-white">{formData.votes} Votes</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span className="text-white">{formData.likes} Likes</span>
          </div>
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  )

  // Render notification form
  const renderNotificationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="notification_title" className="block text-sm font-medium text-gray-300 mb-1">
          Notification Title
        </label>
        <input
          type="text"
          id="notification_title"
          name="notification_title"
          value={formData.notification_title || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="notification_message" className="block text-sm font-medium text-gray-300 mb-1">
          Notification Message
        </label>
        <textarea
          id="notification_message"
          name="notification_message"
          value={formData.notification_message || ""}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="house" className="block text-sm font-medium text-gray-300 mb-1">
          Target House
        </label>
        <select
          id="house"
          name="house"
          value={formData.house || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a house</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Phoenix">Phoenix</option>
          <option value="all">All Houses</option>
        </select>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
        >
          Send Notification
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  )

  return (
    <div className="dark min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 z-10 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <button
              className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                activeTab === "dashboard"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                activeTab === "users" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Users
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                activeTab === "projects" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Projects
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                activeTab === "votes" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("votes")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              Votes
            </button>

            <button
              className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                activeTab === "notifications"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Notifications
            </button>
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button className="flex items-center w-full px-4 py-2 mt-2 text-sm text-gray-400 rounded-md hover:text-white hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => document.getElementById("mobile-menu").classList.toggle("hidden")}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-gray-800 border-b border-gray-700">
        <nav className="px-4 py-2 space-y-1">
          <button
            className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
              activeTab === "dashboard" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("dashboard")
              document.getElementById("mobile-menu").classList.add("hidden")
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
              activeTab === "users" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("users")
              document.getElementById("mobile-menu").classList.add("hidden")
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Users
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
              activeTab === "projects" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("projects")
              document.getElementById("mobile-menu").classList.add("hidden")
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Projects
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
              activeTab === "votes" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("votes")
              document.getElementById("mobile-menu").classList.add("hidden")
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            Votes
          </button>

          <button
            className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
              activeTab === "notifications"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab("notifications")
              document.getElementById("mobile-menu").classList.add("hidden")
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Notifications
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="md:ml-64 p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "users" && renderUsers()}
            {activeTab === "projects" && renderProjects()}
            {activeTab === "votes" && renderVotes()}
            {activeTab === "notifications" && renderNotifications()}
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalType === "editUser"
            ? "Edit User"
            : modalType === "createUser"
              ? "Create User"
              : modalType === "editProject"
                ? "Edit Project"
                : modalType === "viewProject"
                  ? "Project Details"
                  : modalType === "createNotification"
                    ? "Send Notification"
                    : "Modal"
        }
      >
        {modalType === "editUser" && renderUserForm()}
        {modalType === "createUser" && renderUserForm()}
        {modalType === "editProject" && renderProjectForm()}
        {modalType === "viewProject" && renderProjectView()}
        {modalType === "createNotification" && renderNotificationForm()}
      </Modal>
    </div>
  )
}

