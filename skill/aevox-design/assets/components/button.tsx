import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none active:translate-y-px focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.16)] bg-[linear-gradient(180deg,#0bbcd2,#0a9cb4)] shadow-[0_2px_5px_rgba(0,135,155,0.32),inset_0_1px_0_rgba(255,255,255,0.26)] hover:bg-[linear-gradient(180deg,#0aadc2,#0a8ea4)] hover:shadow-[0_5px_14px_rgba(10,160,185,0.42),inset_0_1px_0_rgba(255,255,255,0.2)]",
        destructive:
          "border border-destructive/30 bg-destructive/10 text-destructive shadow-xs hover:bg-destructive/18 hover:border-destructive/55 focus-visible:ring-destructive/30",
        outline:
          "border border-accent-line bg-transparent text-accent hover:bg-accent-ghost hover:border-accent",
        secondary:
          "bg-surface-1 text-ink-1 border border-line-2 shadow-sm hover:bg-surface-3 hover:border-line-3",
        ghost:
          "hover:bg-surface-3 hover:text-ink-1 dark:hover:bg-surface-3",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
