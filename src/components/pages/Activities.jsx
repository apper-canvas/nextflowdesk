import { useState } from "react"
import Header from "@/components/organisms/Header"
import ActivityTimeline from "@/components/organisms/ActivityTimeline"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import ActivityModal from "@/components/molecules/ActivityModal"

const Activities = ({ onMenuClick }) => {
  const [filter, setFilter] = useState("all")
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const filters = [
    { key: "all", label: "All Activities", icon: "Activity" },
    { key: "call", label: "Calls", icon: "Phone" },
    { key: "email", label: "Emails", icon: "Mail" },
    { key: "meeting", label: "Meetings", icon: "Users" },
    { key: "note", label: "Notes", icon: "FileText" }
  ]

const handleActivityAdd = () => {
    setIsActivityModalOpen(true)
  }

  const handleActivityCreated = (newActivity) => {
    // Activity created successfully, modal will close and show success toast
    // ActivityTimeline will refresh when the component re-renders
  }

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false)
  }
  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        onMenuClick={onMenuClick}
        title="Activities"
        showSearch={false}
        actions={
          <Button onClick={handleActivityAdd}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Log Activity
          </Button>
        }
/>
      
<main className="flex-1 overflow-y-auto scrollbar-visible">
        <div className="p-6">
          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {filters.map((filterItem) => (
                <button
                  key={filterItem.key}
                  onClick={() => setFilter(filterItem.key)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === filterItem.key
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                      : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm border border-gray-200"
                  }`}
                >
                  <ApperIcon name={filterItem.icon} className="w-4 h-4 mr-2" />
                  {filterItem.label}
                </button>
              ))}
            </div>
          </div>

{/* Activity Timeline */}
          <ActivityTimeline />
        </div>
      </main>

      <ActivityModal
        isOpen={isActivityModalOpen}
        onClose={handleCloseActivityModal}
        onActivityCreated={handleActivityCreated}
      />
    </div>
  )
}

export default Activities