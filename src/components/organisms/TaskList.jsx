import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format, isFuture, isPast, isToday } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import StatusBadge from "@/components/molecules/StatusBadge";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { taskService } from "@/services/api/taskService";
import { contactService } from "@/services/api/contactService";
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
    return contact?.Name || "No contact"
  }

const toggleTaskStatus = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const newStatus = task.status_c === "completed" ? "pending" : "completed"
      const updatedTask = await taskService.update(taskId, { status: newStatus })
      if (updatedTask) {
        setTasks(tasks.map(t => t.Id === taskId ? updatedTask : t))
        toast.success(`Task marked as ${newStatus}`)
      }
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const getTasksByFilter = () => {
    switch (filter) {
case "today":
        return tasks.filter(task => task.dueDate_c && isToday(new Date(task.dueDate_c)))
      case "overdue":
return tasks.filter(task => 
          task.dueDate_c && 
          isPast(new Date(task.dueDate_c)) && 
          !isToday(new Date(task.dueDate_c)) && 
          task.status_c !== "completed"
        )
case "upcoming":
        return tasks.filter(task => task.dueDate_c && isFuture(new Date(task.dueDate_c)))
      case "completed":
        return tasks.filter(task => task.status_c === "completed")
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
        const isOverdue = task.dueDate_c && 
                         isPast(new Date(task.dueDate_c)) && 
                         !isToday(new Date(task.dueDate_c)) && 
                         task.status_c !== "completed"
        const isDueToday = task.dueDate_c && isToday(new Date(task.dueDate_c))

        return (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
<Card 
              className={`p-6 ${
                isOverdue ? "border-l-4 border-red-500 bg-red-50" :
                isDueToday ? "border-l-4 border-warning bg-yellow-50" :
                task.status_c === "completed" ? "bg-green-50 opacity-75" : ""
              }`}
            >
                <div className="flex items-start space-x-4 flex-1">
                  <button
                    onClick={() => toggleTaskStatus(task.Id)}
className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.status_c === "completed"
                        ? "bg-accent-500 border-accent-500 text-white"
                        : "border-gray-300 hover:border-primary-500"
                    }`}
                  >
{task.status_c === "completed" && (
                      <ApperIcon name="Check" className="w-3 h-3" />
                    )}
                  </button>
                  
                  <div className="flex-1">
<h3 className={`text-lg font-semibold ${
                      task.status_c === "completed" ? "line-through text-gray-500" : "text-gray-900"
                    }`}>
                      {task.title_c || task.Name}
                    </h3>
                    
{task.description_c && (
                      <p className="text-gray-600 mt-1">{task.description_c}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 mt-3">
<span className="text-sm text-gray-500 flex items-center">
                        <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
                        Due {task.dueDate_c ? format(new Date(task.dueDate_c), "MMM d, yyyy") : "No due date"}
                      </span>
                      
                      <span className="text-sm text-gray-500 flex items-center">
                        <ApperIcon name="User" className="w-4 h-4 mr-1" />
                        {getContactName(task.contactId_c?.Id || task.contactId_c)}
                      </span>
                    </div>
                  </div>
                </div>
                
<div className="flex items-center space-x-3">
                  <PriorityBadge priority={task.priority_c} />
                  <StatusBadge status={task.status_c} type="task" />
                  
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