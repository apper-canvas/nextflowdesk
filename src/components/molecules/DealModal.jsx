import { useState } from 'react'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import ApperIcon from '@/components/ApperIcon'
import { dealService } from '@/services/api/dealService'

const DealModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'lead',
    contactId: '',
    probability: '',
    expectedClose: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Deal title is required'
    }
    
    if (!formData.value || formData.value <= 0) {
      newErrors.value = 'Deal value must be greater than 0'
    }
    
    if (!formData.contactId) {
      newErrors.contactId = 'Contact is required'
    }
    
    if (!formData.probability || formData.probability < 0 || formData.probability > 100) {
      newErrors.probability = 'Probability must be between 0 and 100'
    }
    
    if (!formData.expectedClose) {
      newErrors.expectedClose = 'Expected close date is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const dealData = {
        title: formData.title.trim(),
        value: parseFloat(formData.value),
        stage: formData.stage,
        contactId: parseInt(formData.contactId),
        probability: parseInt(formData.probability),
        expectedClose: new Date(formData.expectedClose).toISOString()
      }
      
      await dealService.create(dealData)
      toast.success('Deal created successfully!')
      handleClose()
    } catch (error) {
      console.error('Error creating deal:', error)
      toast.error('Failed to create deal. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: '',
      value: '',
      stage: 'lead',
      contactId: '',
      probability: '',
      expectedClose: ''
    })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  const stageOptions = [
    { value: 'lead', label: 'Lead' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed', label: 'Closed' }
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <Card className="border-0 shadow-none">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Deal
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                disabled={isSubmitting}
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Deal Title"
                type="text"
                value={formData.title}
                onChange={(value) => handleInputChange('title', value)}
                error={errors.title}
                placeholder="Enter deal title"
                required
              />
              
              <FormField
                label="Deal Value"
                type="number"
                value={formData.value}
                onChange={(value) => handleInputChange('value', value)}
                error={errors.value}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
              />
              
              <FormField
                label="Stage"
                type="select"
                value={formData.stage}
                onChange={(value) => handleInputChange('stage', value)}
                error={errors.stage}
                options={stageOptions}
                required
              />
              
              <FormField
                label="Contact ID"
                type="number"
                value={formData.contactId}
                onChange={(value) => handleInputChange('contactId', value)}
                error={errors.contactId}
                placeholder="Enter contact ID"
                required
                min="1"
              />
              
              <FormField
                label="Probability (%)"
                type="number"
                value={formData.probability}
                onChange={(value) => handleInputChange('probability', value)}
                error={errors.probability}
                placeholder="0-100"
                required
                min="0"
                max="100"
              />
              
              <FormField
                label="Expected Close Date"
                type="date"
                value={formData.expectedClose}
                onChange={(value) => handleInputChange('expectedClose', value)}
                error={errors.expectedClose}
                required
              />
              
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                      Create Deal
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DealModal