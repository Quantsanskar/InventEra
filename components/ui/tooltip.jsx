"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const TooltipContext = React.createContext({});

const TooltipProvider = ({ children, delayDuration = 200 }) => (
  <TooltipContext.Provider value={{ delayDuration }}>{children}</TooltipContext.Provider>
);

const Tooltip = ({ children, open, defaultOpen, onOpenChange }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || false);
  const handleOpenChange = (open) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  return (
    <TooltipContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(TooltipContext);

  return (
    <div
      ref={ref}
      onMouseEnter={() => onOpenChange?.(true)}
      onMouseLeave={() => onOpenChange?.(false)}
      {...props}
    >
      {children}
    </div>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, children, ...props }, ref) => {
    const { isOpen } = React.useContext(TooltipContext);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "z-50 absolute overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
