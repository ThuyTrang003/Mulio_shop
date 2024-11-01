import * as React from "react";

import { cn } from "@/lib/utils";
const ErrorField = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      " font-medium text-sm leading-none tracking-tight text-red-500 !mt-1.5",
      className
    )}
    {...props}
  />
));
ErrorField.displayName = "ErrorField"; //text
export { ErrorField };
