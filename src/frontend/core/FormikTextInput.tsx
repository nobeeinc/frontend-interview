import type { TextInputProps } from './TextInput'

import { useFormikContext } from 'formik'
import { TextInput } from './TextInput'
import { ErrorHandler } from './utils/errors'

export function FormikTextInput<T extends Record<string, unknown>>({
  name,
  ...rest
}: TextInputProps) {
  const { getFieldProps, errors, touched } = useFormikContext<T>()

  if (!name) {
    throw new ErrorHandler("Must provide 'name' prop to FormikTextInput")
  }

  return (
    <TextInput
      {...rest}
      {...getFieldProps(name)}
      error={Boolean(touched[name] && errors[name])}
    />
  )
}
