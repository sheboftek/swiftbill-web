import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        brand: "bg-[#3053EC] text-white border border-[#3053EC] hover:bg-white hover:text-[#3053EC]",
        lime: "bg-[#d7e866] text-[#1f1f23] border border-[#d7e866] hover:bg-transparent hover:text-[#d7e866]",
        outline: "bg-transparent text-white border border-[#4c4c4f] hover:border-[#3053EC] hover:text-[#3053EC]",
        ghost: "bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "px-6 py-2.5",
        lg: "px-8 py-3.5 text-base",
        sm: "px-4 py-2 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
