import type { ButtonProps as ButtonPrimitiveProps } from "react-aria-components"
import { Button as ButtonPrimitive, composeRenderProps } from "react-aria-components"
import { type VariantProps, tv } from "tailwind-variants"

const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center gap-x-2 text-center font-medium sm:text-sm",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:size-4",
    "inset-ring inset-ring-(--btn-inset-ring) cursor-pointer outline-hidden [--btn-inset-ring:theme(--color-fg/15%)]",
    "bg-(--btn-bg) text-(--btn-fg) outline-(--btn-outline)",
    "*:data-[slot=icon]:-mx-0.5 [--btn-icon:theme(--color-fg/60%)] *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hovered:[--btn-icon:ButtonText]",
    "[--btn-hovered-bg:color-mix(in_oklab,var(--btn-bg)_95%,white_5%)] data-hovered:bg-(--btn-hovered-bg) data-hovered:*:data-[slot=icon]:text-current/90",
    "data-focused:outline-(--btn-outline) data-focused:outline-1 data-focused:outline-offset-3 data-focused:ring-(--btn-ring) data-focused:ring-4 data-focused:ring-offset-3 data-focused:ring-offset-bg data-focused:*:data-[slot=icon]:text-current/90",
    "[--btn-pressed-bg:color-mix(in_oklab,_var(--btn-bg)_85%,_transparent)] data-pressed:bg-(--btn-pressed-bg) data-pressed:outline-(--btn-outline) data-pressed:*:data-[slot=icon]:text-current",
    "data-disabled:cursor-default data-disabled:opacity-50",
  ],
  variants: {
    intent: {
      primary: [
        "[--btn-bg:var(--color-primary)] [--btn-fg:var(--color-primary-fg)] [--btn-icon:color-mix(in_oklab,var(--color-primary)_40%,white_60%)] [--btn-outline:var(--color-primary)] [--btn-ring:theme(--color-primary/20%)]",
      ],
      secondary: [
        "[--btn-bg:var(--color-secondary)] [--btn-fg:var(--color-secondary-fg)] [--btn-icon:color-mix(in_oklab,var(--color-secondary-fg)_40%,white_60%)] [--btn-outline:var(--color-secondary-fg)] [--btn-ring:theme(--color-secondary-fg/20%)]",
      ],
      danger: [
        "[--btn-bg:var(--color-danger)] [--btn-fg:var(--color-danger-fg)] [--btn-icon:color-mix(in_oklab,var(--color-danger)_40%,white_60%)] [--btn-outline:var(--color-danger)] [--btn-ring:theme(--color-danger/20%)]",
      ],
      warning: [
        "[--btn-bg:var(--color-warning)] [--btn-fg:var(--color-warning-fg)] [--btn-icon:color-mix(in_oklab,var(--color-warning)_40%,black_40%)] [--btn-outline:var(--color-warning)] [--btn-ring:theme(--color-warning/20%)]",
      ],
      outline: [
        "[--btn-bg:transparent] [--btn-fg:var(--color-fg)] [--btn-hovered-bg:theme(--color-secondary)] [--btn-icon:color-mix(in_oklab,var(--color-secondary-fg)_60%,white_40%)] [--btn-inset-ring:var(--border)] [--btn-outline:var(--color-secondary-fg)] [--btn-pressed-bg:var(--color-secondary)] [--btn-ring:theme(--color-secondary-fg/20%)] data-hovered:[--btn-inset-ring:theme(--color-secondary-fg/10%)]",
      ],
      plain: [
        "[--btn-bg:transparent] [--btn-fg:var(--color-fg)] [--btn-hovered-bg:var(--color-secondary)] [--btn-icon:color-mix(in_oklab,var(--color-secondary-fg)_60%,white_40%)] [--btn-inset-ring:none] [--btn-outline:transparent] [--btn-pressed-bg:var(--color-secondary)] [--btn-ring:theme(--color-secondary-fg/20%)] data-focus-visible:bg-(--btn-hovered-bg)",
      ],
    },
    size: {
      "sq-2xs": "size-7",
      "sq-xs": "size-8",
      "sq-sm": "size-9",
      "sq-md": "size-10",
      "sq-lg": "size-11",
      xs: "h-7 px-2",
      sm: "h-9 px-3",
      md: "h-10 px-4",
      lg: "h-11 px-5",
    },
    shape: {
      square: "rounded-md",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "sm",
    shape: "square",
  },
})

interface ButtonProps extends VariantProps<typeof buttonStyles>, ButtonPrimitiveProps {
  ref?: React.RefObject<HTMLButtonElement | null>
}

const Button = ({ intent, size, shape, className, ref, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({ ...renderProps, intent, size, shape, className }),
      )}
      {...props}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonStyles, ButtonPrimitive }
export type { ButtonProps }
