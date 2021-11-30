import type { TextInputProps } from './TextInput'
import type { ReactNode } from 'react'

import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TextInputDefaultProps } from './TextInput'
import { useFormikContext } from 'formik'
import { ErrorHandler } from './utils/errors'
import { useState } from 'react'

type FormikPasswordInputProps = Omit<TextInputProps, 'label'> & {
  label: string | Element | ReactNode
}

export function FormikPasswordInput<T extends Record<string, unknown>>({
  id,
  name,
  label,
  ...rest
}: FormikPasswordInputProps) {
  const { getFieldProps, errors, touched } = useFormikContext<T>()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(
      (currentPasswordVisibility) => !currentPasswordVisibility
    )
  }

  if (!name) {
    throw new ErrorHandler("Must provide 'name' prop to FormikPasswordInput")
  }

  return (
    <label htmlFor={id}>
      {typeof label === 'string' ? (
        <span className="text-sm font-semibold text-grayscale-500">
          {label}
        </span>
      ) : (
        label
      )}

      <TextField
        id={id}
        hiddenLabel
        {...rest}
        {...getFieldProps(name)}
        type={isPasswordVisible ? 'text' : 'password'}
        error={Boolean(touched[name] && errors[name])}
        InputProps={{
          classes: {
            root: TextInputDefaultProps.InputProps.classes.root,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                onMouseDown={togglePasswordVisibility}
                edge="end"
              >
                {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </label>
  )
}
