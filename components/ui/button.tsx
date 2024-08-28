"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";
import { State } from "@data/enums";

//smooth transition for button

const buttonVariants = cva(
  "inline-flex items-center w-full justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:ring-offset-background active:scale-95 transform-gpu duration-200 ease-in-out focus-visible:ring-primary",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        defaultOutline:
          "border border-primary text-primary hover:bg-primary/90 bg-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        close: "text-text border border-text hover:text-gray-500 !w-full",
        success:
          "bg-success text-white hover:bg-success/90 hover:text-success-foreground",
        dark: "bg-black text-white hover:bg-dark/90 hover:text-dark-foreground",
        info: "bg-info text-white hover:bg-info/90 hover:text-info-foreground",
        infoOutline:
          "border border-info text-info hover:bg-info/90 hover:text-white",
        error:
          "bg-error text-white hover:bg-error/90 hover:text-error-foreground",
        successOutline: "border border-success text-success",
      },
      size: {
        default: "h-11 px-4 py-2 w-full",
        sm: "h-9 rounded-md px-3 !text-sm",
        lg: "h-11 rounded-md px-8 !text-lg",
        icon: "h-10 !w-10 rounded-md",
        xl: "h-14 rounded-md px-8 !text-lg",
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
  buttonstate?: State;
  asyncOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [buttonState, setButtonState] = React.useState<State>(
      props.buttonstate || State.SUCCESS
    );
    console.log("buttonState", buttonState);
    React.useEffect(() => {
      if (props.buttonstate) setButtonState(props.buttonstate);
    }, [props.buttonstate]);
    return buttonState === State.LOADING ? (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "cursor-wait opacity-50"
        )}
        ref={ref}
        disabled={true}
        {...props}
      >
        Loading...
      </Comp>
    ) : (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
          if (props.asyncOnClick) {
            setButtonState(State.LOADING);
            await props.asyncOnClick(e);
            setButtonState(State.SUCCESS);
          } else {
            props.onClick?.(e);
          }
        }}
        disabled={props.disabled}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
