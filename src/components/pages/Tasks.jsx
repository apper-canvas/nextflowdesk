import { useState } from "react"
import { toast } from "react-toastify"
import Header from "@/components/organisms/Header"
import TaskList from "@/components/organisms/TaskList"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import TaskModal from "@/components/molecules/TaskModal"
const Tasks = ({ onMenuClick }) => {
  const [filter, setFilter] = useState("all")
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const filters = [
    { key: "all", label: "All Tasks", icon: "List" },
    { key: "today", label: "Today", icon: "Calendar" },
    { key: "overdue", label: "Overdue", icon: "AlertCircle" },
    { key: "upcoming", label: "Upcoming", icon: "Clock" },
    { key: "completed", label: "Completed", icon: "CheckCircle" }
  ]

const handleTaskAdd = () => {
    setShowTaskModal(true)
  }

  const handleTaskCreated = (newTask) => {
    setRefreshKey(prev => prev + 1)
    toast.success(`Task "${newTask.title}" created successfully!`)
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        onMenuClick={onMenuClick}
        title="Tasks"
        showSearch={false}
        actions={
          <Button onClick={handleTaskAdd}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        }
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Filter Tabs */}
          <div className="mb-6">
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

{/* Task List */}
          <TaskList key={refreshKey} filter={filter} onTaskAdd={handleTaskAdd} />
</div>
      </main>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  )
}

export default Tasks