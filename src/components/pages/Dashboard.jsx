import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/organisms/Header"
import DashboardStats from "@/components/organisms/DashboardStats"
import TaskList from "@/components/organisms/TaskList"
import ActivityTimeline from "@/components/organisms/ActivityTimeline"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Dashboard = ({ onMenuClick }) => {
  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        onMenuClick={onMenuClick}
        title="Dashboard"
        actions={
          <Button>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        }
/>
      
<main className="flex-1 overflow-y-auto scrollbar-visible">
        <div className="p-6 space-y-8">
          {/* Stats Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Overview</h2>
            <DashboardStats />
          </motion.section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Tasks */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </div>
                <div className="p-6 max-h-96 overflow-y-auto">
                  <TaskList filter="today" />
                </div>
              </Card>
            </motion.section>

            {/* Recent Activity */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Activity" className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </div>
                <div className="p-6 max-h-96 overflow-y-auto">
                  <ActivityTimeline limit={5} />
                </div>
              </Card>
            </motion.section>
          </div>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-20 flex-col space-y-2">
                  <ApperIcon name="UserPlus" className="w-6 h-6" />
                  <span>Add Contact</span>
                </Button>
                <Button variant="secondary" className="h-20 flex-col space-y-2">
                  <ApperIcon name="Target" className="w-6 h-6" />
                  <span>Create Deal</span>
                </Button>
                <Button variant="accent" className="h-20 flex-col space-y-2">
                  <ApperIcon name="Plus" className="w-6 h-6" />
                  <span>Add Task</span>
                </Button>
                <Button variant="ghost" className="h-20 flex-col space-y-2 border-2 border-dashed border-gray-300">
                  <ApperIcon name="FileText" className="w-6 h-6" />
                  <span>Log Activity</span>
                </Button>
              </div>
            </Card>
          </motion.section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard