import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { contactService } from "@/services/api/contactService";

const ContactDetail = ({ onMenuClick }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

const loadContact = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Enhanced ID validation with debugging
      console.log('ContactDetail - Raw ID parameter from URL:', id)
      
      if (!id) {
        console.error('ContactDetail - ID parameter is missing from URL')
        setError("Contact ID is missing")
        setLoading(false)
        return
      }
      
      const contactId = parseInt(id, 10)
      console.log('ContactDetail - Parsed contact ID:', contactId)
      
      if (isNaN(contactId)) {
        console.error('ContactDetail - ID is not a valid number:', id)
        setError(`Invalid contact ID format: "${id}"`)
        setLoading(false)
        return
      }
      
      if (contactId <= 0) {
        console.error('ContactDetail - ID must be positive:', contactId)
        setError(`Invalid contact ID: ${contactId}`)
        setLoading(false)
        return
      }
      
      console.log('ContactDetail - Attempting to fetch contact with ID:', contactId)
      const data = await contactService.getById(contactId)
      
      if (data) {
        console.log('ContactDetail - Contact loaded successfully:', data.Name)
        setContact(data)
      } else {
        console.error('ContactDetail - No contact data returned for ID:', contactId)
        setError("Contact not found")
      }
    } catch (err) {
      console.error('ContactDetail - Error loading contact:', err)
      setError("Failed to load contact details. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      loadContact()
    }
  }, [id])

  const handleBack = () => {
    navigate("/contacts")
  }

  if (loading) return <Loading type="page" />
  if (error) return <Error message={error} onRetry={loadContact} />
  if (!contact) return <Error message="Contact not found" />

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        onMenuClick={onMenuClick}
        title="Contact Details"
        showSearch={false}
        actions={
          <Button variant="secondary" onClick={handleBack}>
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Contacts
          </Button>
        }
/>
      
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <div className="p-6">
          {/* Contact Header */}
          <Card className="p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="User" className="w-10 h-10 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{contact.Name}</h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {contact.position_c} {contact.company_c && `at ${contact.company_c}`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contact.Tags && contact.Tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="secondary">
                  <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                  Edit Contact
                </Button>
                <Button>
                  <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </Card>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="User" className="w-5 h-5 mr-2 text-primary-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-900 font-medium">{contact.Name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-gray-900">
                    {contact.email_c ? (
                      <a 
                        href={`mailto:${contact.email_c}`}
                        className="text-primary-600 hover:text-primary-700 underline"
                      >
                        {contact.email_c}
                      </a>
                    ) : 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-gray-900">
                    {contact.phone_c ? (
                      <a 
                        href={`tel:${contact.phone_c}`}
                        className="text-primary-600 hover:text-primary-700 underline"
                      >
                        {contact.phone_c}
                      </a>
                    ) : 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Owner</label>
                  <p className="text-gray-900">{contact.Owner?.Name || 'Unassigned'}</p>
                </div>
              </div>
            </Card>

            {/* Company Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="Building" className="w-5 h-5 mr-2 text-primary-600" />
                Company Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Company Name</label>
                  <p className="text-gray-900 font-medium">{contact.company_c || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Position</label>
                  <p className="text-gray-900">{contact.position_c || 'Not provided'}</p>
                </div>
              </div>
            </Card>

            {/* Timeline Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="Clock" className="w-5 h-5 mr-2 text-primary-600" />
                Timeline
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date Added</label>
                  <p className="text-gray-900">
                    {contact.createdAt_c ? format(new Date(contact.createdAt_c), "MMMM d, yyyy 'at' h:mm a") : 'Not available'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Activity</label>
                  <p className="text-gray-900">
                    {contact.lastActivity_c ? format(new Date(contact.lastActivity_c), "MMMM d, yyyy 'at' h:mm a") : 'No recent activity'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created On</label>
                  <p className="text-gray-900">
                    {contact.CreatedOn ? format(new Date(contact.CreatedOn), "MMMM d, yyyy 'at' h:mm a") : 'Not available'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created By</label>
                  <p className="text-gray-900">{contact.CreatedBy?.Name || 'System'}</p>
                </div>
                {contact.ModifiedOn && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Modified</label>
                      <p className="text-gray-900">
                        {format(new Date(contact.ModifiedOn), "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Modified By</label>
                      <p className="text-gray-900">{contact.ModifiedBy?.Name || 'System'}</p>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Tags & Additional Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="Tags" className="w-5 h-5 mr-2 text-primary-600" />
                Tags & Labels
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tags</label>
                  <div className="mt-2">
                    {contact.Tags && contact.Tags.split(',').length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {contact.Tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No tags assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="secondary" className="flex flex-col items-center p-4 h-auto">
                <ApperIcon name="Mail" className="w-6 h-6 mb-2" />
                <span className="text-sm">Send Email</span>
              </Button>
              <Button variant="secondary" className="flex flex-col items-center p-4 h-auto">
                <ApperIcon name="Phone" className="w-6 h-6 mb-2" />
                <span className="text-sm">Make Call</span>
              </Button>
              <Button variant="secondary" className="flex flex-col items-center p-4 h-auto">
                <ApperIcon name="Calendar" className="w-6 h-6 mb-2" />
                <span className="text-sm">Schedule Meeting</span>
              </Button>
              <Button variant="secondary" className="flex flex-col items-center p-4 h-auto">
                <ApperIcon name="FileText" className="w-6 h-6 mb-2" />
                <span className="text-sm">Add Note</span>
              </Button>
            </div>
</Card>
        </div>
      </main>
    </div>
  )
}

export default ContactDetail