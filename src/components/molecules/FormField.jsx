import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"

const FormField = ({ 
  label, 
  error, 
  required, 
  children,
  className = "",
  ...inputProps 
}) => {
  return (
    <div className={className}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      {children || <Input error={error} {...inputProps} />}
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default FormField