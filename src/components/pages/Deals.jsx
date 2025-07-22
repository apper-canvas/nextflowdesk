import { useState } from "react"
import Header from "@/components/organisms/Header"
import DealPipeline from "@/components/organisms/DealPipeline"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import DealModal from "@/components/molecules/DealModal"

const Deals = ({ onMenuClick }) => {
  const [viewMode, setViewMode] = useState("pipeline") // pipeline, list
  const [isDealModalOpen, setIsDealModalOpen] = useState(false)

  const handleDealAdd = () => {
    setIsDealModalOpen(true)
  }

  const handleDealModalClose = () => {
    setIsDealModalOpen(false)
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        onMenuClick={onMenuClick}
        title="Deals"
        showSearch={false}
        actions={
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("pipeline")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "pipeline" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <ApperIcon name="Kanban" className="w-4 h-4 mr-1 inline" />
                Pipeline
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <ApperIcon name="List" className="w-4 h-4 mr-1 inline" />
                List
              </button>
            </div>
            <Button onClick={handleDealAdd}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add Deal
            </Button>
          </div>
        }
      />
      
<main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <DealPipeline onDealAdd={handleDealAdd} />
        </div>
      </main>
      
      <DealModal 
        isOpen={isDealModalOpen}
        onClose={handleDealModalClose}
      />
    </div>
  )
}

export default Deals