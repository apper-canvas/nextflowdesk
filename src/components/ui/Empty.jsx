import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  message = "No data available",
  description = "Get started by adding your first item.",
  icon = "Database",
  action,
  actionLabel = "Add New"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-elevation"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-semibold text-gray-900 mb-2"
        >
          {message}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {description}
        </motion.p>
        
        {action && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={action}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-medium rounded-lg hover:shadow-elevation-lg transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty