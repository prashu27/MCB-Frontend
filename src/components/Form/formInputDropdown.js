import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { Controller } from 'react-hook-form'

export const FormInputDropdown = ({
  name,
  control,
  label,
  rules,
  error,
  options,
  ...rest
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <FormControl fullWidth size="medium" error={error}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Select fullWidth onChange={onChange} value={value} {...rest}>
            {generateSingleOptions()}
          </Select>
        )}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
