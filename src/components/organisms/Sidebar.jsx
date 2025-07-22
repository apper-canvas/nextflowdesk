import { NavLink, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { path: "/", icon: "BarChart3", label: "Dashboard" },
    { path: "/contacts", icon: "Users", label: "Contacts" },
    { path: "/deals", icon: "Target", label: "Deals" },
    { path: "/tasks", icon: "CheckSquare", label: "Tasks" },
    { path: "/activities", icon: "Activity", label: "Activities" }
  ]

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold gradient-text">FlowDesk</span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-primary-50 to-purple-50 text-primary-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <ApperIcon 
                  name={item.icon} 
                  className={`w-5 h-5 mr-3 ${
                    isActive(item.path) ? "text-primary-600" : "text-gray-400"
                  }`} 
                />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {isOpen && (
          <div className="fixed inset-0 flex z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={onClose}
                >
                  <ApperIcon name="X" className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="flex items-center h-16 px-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Zap" className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-3 text-xl font-bold gradient-text">FlowDesk</span>
                </div>
              </div>
              
              <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-primary-50 to-purple-50 text-primary-700 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <ApperIcon 
                      name={item.icon} 
                      className={`w-5 h-5 mr-3 ${
                        isActive(item.path) ? "text-primary-600" : "text-gray-400"
                      }`} 
                    />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar