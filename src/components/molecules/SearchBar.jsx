import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}

export default SearchBar