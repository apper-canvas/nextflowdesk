import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { contactService } from "@/services/api/contactService"
const ContactList = ({ searchTerm = "", onContactSelect, onContactAdd }) => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const loadContacts = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await contactService.getAll()
      setContacts(data)
    } catch (err) {
      setError("Failed to load contacts. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

const filteredContacts = contacts.filter(contact => 
    contact.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company_c?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading type="table" />
  if (error) return <Error message={error} onRetry={loadContacts} />
  if (!contacts.length) return (
    <Empty 
      message="No contacts found"
      description="Start building your customer relationships by adding your first contact."
      icon="Users"
      action={onContactAdd}
      actionLabel="Add Contact"
    />
  )

return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-visible">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
<Card 
              hover 
              className="p-6 cursor-pointer"
              onClick={() => {
                console.log('ContactList - Contact object:', contact);
                console.log('ContactList - Contact ID:', contact.Id);
                
                if (!contact.Id && contact.Id !== 0) {
                  console.error('ContactList - Contact ID is missing or undefined:', contact);
                  return;
                }
                
                navigate(`/contacts/${contact.Id}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="w-6 h-6 text-primary-600" />
                  </div>
<div>
                    <h3 className="text-lg font-semibold text-gray-900">{contact.Name}</h3>
                    <p className="text-sm text-gray-600">{contact.position_c} at {contact.company_c}</p>
                    {/* Debug info - remove in production */}
                    {(!contact.Id && contact.Id !== 0) && (
                      <p className="text-xs text-red-500">Warning: Contact ID missing</p>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500 flex items-center">
                        <ApperIcon name="Mail" className="w-3 h-3 mr-1" />
                        {contact.email_c}
                      </span>
                      {contact.phone_c && (
                        <span className="text-sm text-gray-500 flex items-center">
                          <ApperIcon name="Phone" className="w-3 h-3 mr-1" />
                          {contact.phone_c}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
<div className="flex items-center space-x-3">
                  <div className="text-right text-sm text-gray-500">
                    <p>Added {contact.createdAt_c ? format(new Date(contact.createdAt_c), "MMM d, yyyy") : "N/A"}</p>
                    {contact.lastActivity_c && (
                      <p>Last activity: {format(new Date(contact.lastActivity_c), "MMM d")}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {contact.Tags && contact.Tags.split(',').slice(0, 2).map(tag => tag.trim()).filter(Boolean).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {contact.Tags && contact.Tags.split(',').length > 2 && (
                      <Badge variant="default" className="text-xs">
                        +{contact.Tags.split(',').length - 2}
                      </Badge>
                    )}
                  </div>
                  <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {searchTerm && !filteredContacts.length && (
        <Empty 
          message="No contacts match your search"
          description={`No results found for "${searchTerm}". Try adjusting your search terms.`}
          icon="Search"
        />
      )}
    </div>
  )
}

export default ContactList