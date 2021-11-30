import type { TextFieldProps } from '@mui/material'

import { TextField } from '@mui/material'

export const TextInput = ({
  id,
  label,
  InputProps = TextInputDefaultProps.InputProps,
  ...rest
}: TextInputProps) => {
  return (
    <label htmlFor={id}>
      <span className="text-sm font-semibold text-grayscale-500">{label}</span>
      <TextField hiddenLabel id={id} InputProps={InputProps} {...rest} />
    </label>
  )
}

export const TextInputDefaultProps = {
  InputProps: {
    classes: {
      root: 'h-12 rounded-lg mt-1',
    },
  },
}

export type TextInputProps = TextFieldProps & {
  id: string
  label: string
}
