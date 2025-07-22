import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"

const Header = ({ onMenuClick, title = "Dashboard", showSearch = true, actions }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={onMenuClick}
            >
              <ApperIcon name="Menu" className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">
              {title}
            </h1>
          </div>

          {/* Center section - Search */}
          {showSearch && (
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <SearchBar placeholder="Search contacts, deals, tasks..." />
            </div>
          )}

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {actions}
            <Button size="sm" className="relative">
              <ApperIcon name="Bell" className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <SearchBar placeholder="Search contacts, deals, tasks..." />
          </div>
        )}
      </div>
    </motion.header>
  )
}

export default Header