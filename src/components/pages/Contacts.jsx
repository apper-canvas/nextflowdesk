import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import ContactList from "@/components/organisms/ContactList";
import Header from "@/components/organisms/Header";
import ContactModal from "@/components/molecules/ContactModal";
import Button from "@/components/atoms/Button";

const Contacts = ({ onMenuClick }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term) {
      setSearchParams({ search: term })
    } else {
      setSearchParams({})
    }
  }

  const handleContactSelect = (contact) => {
    navigate(`/contacts/${contact.Id}`)
  }

const handleContactAdd = () => {
    setIsModalOpen(true)
  }

  const handleContactCreated = (newContact) => {
    // Force ContactList to refresh by updating search params
    setSearchParams(prev => ({ ...Object.fromEntries(prev), _refresh: Date.now() }))
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <Header 
        onMenuClick={onMenuClick}
        title="Contacts"
        showSearch={false}
        actions={
          <Button onClick={handleContactAdd}>
            <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        }
      />
      
      <main className="flex-1 overflow-y-auto scrollbar-visible h-0">
        <div className="p-6">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="secondary" size="sm">
                  <ApperIcon name="ArrowUpDown" className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
          </div>

          {/* Contact List */}
          <ContactList 
            searchTerm={searchTerm}
            onContactSelect={handleContactSelect}
            onContactAdd={handleContactAdd}
          />
        </div>
      </main>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContactCreated={handleContactCreated}
      />
    </div>
  )
}

export default Contacts