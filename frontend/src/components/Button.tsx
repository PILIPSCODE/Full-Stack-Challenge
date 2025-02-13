import { ButtonHTMLAttributes, ReactNode } from "react"

import { VariantProps, cva } from 'class-variance-authority'
import cn from "@/utils/cn"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {
    children: ReactNode,
}


export default function Button({ children, className, variant, size, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(buttonVariant({ variant, size, className }))}>
            {children}
        </button>
    )
}


const buttonVariant = cva("", {
    variants: {
        variant: {
            primary: "bg-primary",
            tranparent: "backdrop-blur-sm ",
            action: "bg-action py-1 px-3",
        },
        size: {
            sm: "text-sm-custom px-2",
            md: "text-base-custom py-2 px-4",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

