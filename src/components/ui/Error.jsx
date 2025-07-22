import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  message = "Something went wrong. Please try again.",
  onRetry,
  title = "Oops!"
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
          className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center shadow-elevation-lg"
        >
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-semibold text-gray-900 mb-2"
        >
          {title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          {message}
        </motion.p>
        
        {onRetry && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:shadow-elevation-lg transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Error