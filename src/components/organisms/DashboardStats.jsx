import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import { dealService } from "@/services/api/dealService"
import { contactService } from "@/services/api/contactService"
import { taskService } from "@/services/api/taskService"
import { activityService } from "@/services/api/activityService"

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalDeals: 0,
    totalValue: 0,
    pendingTasks: 0,
    recentActivities: 0
  })
  const [loading, setLoading] = useState(false)

  const loadStats = async () => {
    try {
      setLoading(true)
      const [contacts, deals, tasks, activities] = await Promise.all([
        contactService.getAll(),
        dealService.getAll(),
        taskService.getAll(),
        activityService.getAll()
      ])

      const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
      const pendingTasks = tasks.filter(task => task.status !== "completed").length
      const recentActivities = activities.filter(activity => {
        const activityDate = new Date(activity.timestamp)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return activityDate >= weekAgo
      }).length

      setStats({
        totalContacts: contacts.length,
        totalDeals: deals.length,
        totalValue,
        pendingTasks,
        recentActivities
      })
    } catch (err) {
      console.error("Failed to load dashboard stats:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: "Users",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      title: "Active Deals",
      value: stats.totalDeals,
      icon: "Target",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      title: "Pipeline Value",
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: "DollarSign",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: "CheckSquare",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100"
    },
    {
      title: "Recent Activities",
      value: stats.recentActivities,
      icon: "Activity",
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100"
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`p-6 bg-gradient-to-br ${stat.bgGradient} border-0 hover:shadow-elevation-lg transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default DashboardStats