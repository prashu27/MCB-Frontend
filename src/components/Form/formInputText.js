import React from 'react'
import { TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

export const FormInputText = ({
  name,
  control,
  label,
  rules,
  error,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        //fieldState: { error },
      }) => (
        <TextField
          onChange={onChange}
          value={value}
          label={label}
          error={!!error}
          helperText={
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          }
          {...rest}
        />
      )}
    />
  )
}
