import React from "react"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    className={`rounded-md border border-border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
    ref={ref}
  >
    {children}
  </div>
))
Card.displayName = "Card"

export { Card }

