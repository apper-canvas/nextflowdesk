import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import StatusBadge from "@/components/molecules/StatusBadge"
import { dealService } from "@/services/api/dealService"
import { contactService } from "@/services/api/contactService"
import { toast } from "react-toastify"

const DealPipeline = ({ onDealAdd }) => {
  const [deals, setDeals] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const stages = [
    { key: "lead", title: "Lead", color: "bg-gray-100" },
    { key: "qualified", title: "Qualified", color: "bg-blue-100" },
    { key: "proposal", title: "Proposal", color: "bg-purple-100" },
    { key: "negotiation", title: "Negotiation", color: "bg-yellow-100" },
    { key: "closed", title: "Closed", color: "bg-green-100" }
  ]

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      const [dealsData, contactsData] = await Promise.all([
        dealService.getAll(),
        contactService.getAll()
      ])
      setDeals(dealsData)
      setContacts(contactsData)
    } catch (err) {
      setError("Failed to load pipeline data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.Id === contactId)
    return contact?.name || "Unknown Contact"
  }

  const handleStageChange = async (dealId, newStage) => {
    try {
      const updatedDeal = await dealService.update(dealId, { stage: newStage })
      setDeals(deals.map(deal => 
        deal.Id === dealId ? updatedDeal : deal
      ))
      toast.success("Deal stage updated successfully!")
    } catch (err) {
      toast.error("Failed to update deal stage")
    }
  }

  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadData} />

  if (!deals.length) return (
    <Empty 
      message="No deals in pipeline"
      description="Start tracking your sales opportunities by adding your first deal."
      icon="Target"
      action={onDealAdd}
      actionLabel="Add Deal"
    />
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {stages.map((stage) => {
          const stageDeals = deals.filter(deal => deal.stage === stage.key)
          const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)

          return (
            <div key={stage.key} className="space-y-4">
              <div className={`rounded-lg p-4 ${stage.color}`}>
                <h3 className="font-semibold text-gray-900">{stage.title}</h3>
                <p className="text-sm text-gray-600">{stageDeals.length} deals</p>
                <p className="text-lg font-bold text-gray-900">
                  ${stageValue.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3">
                {stageDeals.map((deal, index) => (
                  <motion.div
                    key={deal.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("dealId", deal.Id.toString())
                    }}
                  >
                    <Card 
                      hover 
                      className="p-4 cursor-move border-l-4 border-primary-500"
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{deal.title}</h4>
                          <p className="text-sm text-gray-600">{getContactName(deal.contactId)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary-600">
                            ${deal.value.toLocaleString()}
                          </span>
                          <StatusBadge status={deal.stage} type="deal" />
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{deal.probability}% probability</span>
                          <span>{format(new Date(deal.expectedClose), "MMM d")}</span>
                        </div>
                        
                        <div className="flex space-x-1">
                          {stages.map((s) => (
                            <button
                              key={s.key}
                              onClick={() => handleStageChange(deal.Id, s.key)}
                              className={`px-2 py-1 text-xs rounded ${
                                s.key === deal.stage 
                                  ? "bg-primary-500 text-white" 
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {s.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DealPipeline