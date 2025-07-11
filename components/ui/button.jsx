import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = (variant, size) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", onClick, ...props }, ref) => {
  const handleClick = (event) => {
    // If an onClick prop is provided, call it
    if (onClick) {
      onClick(event);
    }

    // If you want to handle URL redirection within this component:
    if (props.url) {
      window.location.href = props.url; // Redirect to the specified URL
    }
  };

  return (
    <button
      className={cn(buttonVariants(variant, size), className)}
      ref={ref}
      onClick={handleClick}
      {...props}
    />
  );
});

Button.displayName = "Button"
export { Button }
export default Button