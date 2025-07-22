import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { activityService } from "@/services/api/activityService"
import { contactService } from "@/services/api/contactService"

const ActivityTimeline = ({ contactId, limit }) => {
  const [activities, setActivities] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      const [activitiesData, contactsData] = await Promise.all([
        activityService.getAll(),
        contactService.getAll()
      ])
      
      let filteredActivities = activitiesData
      if (contactId) {
        filteredActivities = activitiesData.filter(a => a.contactId === contactId)
      }
      
      if (limit) {
        filteredActivities = filteredActivities.slice(0, limit)
      }
      
      setActivities(filteredActivities)
      setContacts(contactsData)
    } catch (err) {
      setError("Failed to load activities. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [contactId, limit])

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.Id === contactId)
    return contact?.name || "Unknown Contact"
  }

  const getActivityIcon = (type) => {
    const iconMap = {
      call: "Phone",
      email: "Mail",
      meeting: "Users",
      note: "FileText",
      task: "CheckSquare"
    }
    return iconMap[type] || "Activity"
  }

  const getActivityColor = (type) => {
    const colorMap = {
      call: "text-blue-600 bg-blue-100",
      email: "text-green-600 bg-green-100",
      meeting: "text-purple-600 bg-purple-100",
      note: "text-yellow-600 bg-yellow-100",
      task: "text-indigo-600 bg-indigo-100"
    }
    return colorMap[type] || "text-gray-600 bg-gray-100"
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />
  
  if (!activities.length) return (
    <Empty 
      message="No activities yet"
      description="Activity history will appear here as you interact with contacts."
      icon="Activity"
    />
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 to-purple-200"></div>
        
        {activities.map((activity, index) => (
          <motion.div
            key={activity.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start space-x-4 pb-8"
          >
            {/* Timeline dot */}
            <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getActivityColor(activity.type)}`}>
              <ApperIcon name={getActivityIcon(activity.type)} className="w-4 h-4" />
            </div>
            
            {/* Activity content */}
            <Card className="flex-1 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary">{activity.type}</Badge>
                    <span className="text-sm text-gray-500">
                      {format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                  
                  <p className="text-gray-900 mb-2">{activity.description}</p>
                  
                  {!contactId && (
                    <p className="text-sm text-gray-600 flex items-center">
                      <ApperIcon name="User" className="w-3 h-3 mr-1" />
                      {getContactName(activity.contactId)}
                    </p>
                  )}
                  
                  {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Additional Details:</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        {Object.entries(activity.metadata).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-medium mr-2 capitalize">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ActivityTimeline