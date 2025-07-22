import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format, isToday, isPast, isFuture } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import PriorityBadge from "@/components/molecules/PriorityBadge"
import StatusBadge from "@/components/molecules/StatusBadge"
import { taskService } from "@/services/api/taskService"
import { contactService } from "@/services/api/contactService"
import { toast } from "react-toastify"

const TaskList = ({ filter = "all", onTaskAdd }) => {
  const [tasks, setTasks] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      const [tasksData, contactsData] = await Promise.all([
        taskService.getAll(),
        contactService.getAll()
      ])
      setTasks(tasksData)
      setContacts(contactsData)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.Id === contactId)
    return contact?.name || "No contact"
  }

  const toggleTaskStatus = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const newStatus = task.status === "completed" ? "pending" : "completed"
      const updatedTask = await taskService.update(taskId, { status: newStatus })
      setTasks(tasks.map(t => t.Id === taskId ? updatedTask : t))
      toast.success(`Task marked as ${newStatus}`)
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const getTasksByFilter = () => {
    switch (filter) {
      case "today":
        return tasks.filter(task => isToday(new Date(task.dueDate)))
      case "overdue":
        return tasks.filter(task => 
          isPast(new Date(task.dueDate)) && 
          !isToday(new Date(task.dueDate)) && 
          task.status !== "completed"
        )
      case "upcoming":
        return tasks.filter(task => isFuture(new Date(task.dueDate)))
      case "completed":
        return tasks.filter(task => task.status === "completed")
      default:
        return tasks
    }
  }

  const filteredTasks = getTasksByFilter()

  if (loading) return <Loading type="table" />
  if (error) return <Error message={error} onRetry={loadData} />
  
  if (!tasks.length) return (
    <Empty 
      message="No tasks found"
      description="Stay organized by creating your first task to manage customer interactions."
      icon="CheckSquare"
      action={onTaskAdd}
      actionLabel="Add Task"
    />
  )

  if (!filteredTasks.length) return (
    <Empty 
      message={`No ${filter} tasks`}
      description="All tasks in this category are complete!"
      icon="CheckCircle"
    />
  )

  return (
    <div className="space-y-4">
      {filteredTasks.map((task, index) => {
        const isOverdue = isPast(new Date(task.dueDate)) && 
                         !isToday(new Date(task.dueDate)) && 
                         task.status !== "completed"
        const isDueToday = isToday(new Date(task.dueDate))

        return (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`p-6 ${
                isOverdue ? "border-l-4 border-error bg-red-50" :
                isDueToday ? "border-l-4 border-warning bg-yellow-50" :
                task.status === "completed" ? "bg-green-50 opacity-75" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <button
                    onClick={() => toggleTaskStatus(task.Id)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.status === "completed"
                        ? "bg-accent-500 border-accent-500 text-white"
                        : "border-gray-300 hover:border-primary-500"
                    }`}
                  >
                    {task.status === "completed" && (
                      <ApperIcon name="Check" className="w-3 h-3" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${
                      task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"
                    }`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-sm text-gray-500 flex items-center">
                        <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
                        Due {format(new Date(task.dueDate), "MMM d, yyyy")}
                      </span>
                      
                      <span className="text-sm text-gray-500 flex items-center">
                        <ApperIcon name="User" className="w-4 h-4 mr-1" />
                        {getContactName(task.contactId)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} type="task" />
                  
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

export default TaskList