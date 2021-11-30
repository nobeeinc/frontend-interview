import type { ButtonProps } from '@mui/material'

import cx from 'classnames'
import { Button as MuiButton } from '@mui/material'

export const Button = ({
  color = 'primary',
  variant = 'contained',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <MuiButton
      color={color}
      variant={variant}
      disableElevation
      classes={{
        root: cx('rounded-lg normal-case h-12 font-semibold', {
          'text-white': color === 'primary',
          'bg-white': variant === 'outlined' && color === 'inherit',
        }),
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  )
}
