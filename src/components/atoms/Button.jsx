import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-elevation-lg hover:scale-105 focus:ring-primary-500",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-elevation focus:ring-primary-500",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:shadow-elevation-lg hover:scale-105 focus:ring-accent-500",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-elevation-lg hover:scale-105 focus:ring-red-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  
  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button