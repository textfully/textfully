import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:outline-primary focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "bg-primary text-primary-foreground shadow hover:brightness-110",
        "b&w": "bg-white hover:brightness-90 text-black",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:brightness-110",
        surface: "bg-zinc-900 hover:bg-zinc-800 text-white",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:brightness-110",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "destructive-surface":
          "bg-destructive/10 text-destructive hover:brightness-110 focus-visible:outline-destructive",
      },
      size: {
        default: "h-9 rounded-md px-3 py-1.5 text-sm",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-9 w-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      loading = false,
      children,
      disabled,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <Loader2 className="h-5 w-5 mr-1 animate-spin" />}
        <Slottable>{loading ? "Loading..." : children}</Slottable>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
