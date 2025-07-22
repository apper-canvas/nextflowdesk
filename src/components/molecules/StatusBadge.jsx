import Badge from "@/components/atoms/Badge"

const StatusBadge = ({ status, type = "task" }) => {
  const taskConfig = {
    pending: { variant: "warning", label: "Pending" },
    completed: { variant: "success", label: "Completed" },
    in_progress: { variant: "primary", label: "In Progress" }
  }

  const dealConfig = {
    lead: { variant: "default", label: "Lead" },
    qualified: { variant: "primary", label: "Qualified" },
    proposal: { variant: "secondary", label: "Proposal" },
    negotiation: { variant: "warning", label: "Negotiation" },
    closed: { variant: "success", label: "Closed" }
  }

  const config = type === "deal" ? dealConfig : taskConfig
  const statusConfig = config[status?.toLowerCase()] || config.pending || config.lead

  return (
    <Badge variant={statusConfig.variant}>
      {statusConfig.label}
    </Badge>
  )
}

export default StatusBadge