import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

const buttonVariants = tv({
  base: "text-base rounded-lg px-5 font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-teal-300 text-teal-950 hover:bg-teal-400",
      secondary: "bg-zinc-800 text-zic-200  hover:bg-zinc-700",
      transparent: "bg-transparent text-zinc-200",
    },
    size: {
      default: "py-1",
      full: "w-full h-8",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  );
}
