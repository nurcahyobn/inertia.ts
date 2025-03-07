import { IconCamera, IconFolder, IconPaperclip45 } from "justd-icons"
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components"

import type { VariantProps } from "tailwind-variants"
import { Button, type buttonStyles } from "./button"

interface FileTriggerProps extends FileTriggerPrimitiveProps, VariantProps<typeof buttonStyles> {
  withIcon?: boolean
  isDisabled?: boolean
  ref?: React.RefObject<HTMLInputElement>
}

const FileTrigger = ({
  intent = "outline",
  size="md",
  shape = "square",
  withIcon = true,
  ref,
  ...props
}: FileTriggerProps) => {
  return (
    <FileTriggerPrimitive ref={ref} {...props}>
      <Button isDisabled={props.isDisabled} intent={intent} size={size} shape={shape}>
        {withIcon &&
          (props.defaultCamera ? (
            <IconCamera />
          ) : props.acceptDirectory ? (
            <IconFolder />
          ) : (
            <IconPaperclip45 />
          ))}
        {props.children ? (
          props.children
        ) : (
          <>
            {props.allowsMultiple
              ? "Browse a files"
              : props.acceptDirectory
                ? "Browse"
                : "Browse a file"}
            ...
          </>
        )}
      </Button>
    </FileTriggerPrimitive>
  )
}

export type { FileTriggerProps }
export { FileTrigger }
