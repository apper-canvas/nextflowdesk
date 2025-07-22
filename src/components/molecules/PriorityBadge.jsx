import Badge from "@/components/atoms/Badge"

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    high: { variant: "error", label: "High Priority" },
    medium: { variant: "warning", label: "Medium Priority" },
    low: { variant: "success", label: "Low Priority" }
  }

  const config = priorityConfig[priority?.toLowerCase()] || priorityConfig.low

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
}

export default PriorityBadge