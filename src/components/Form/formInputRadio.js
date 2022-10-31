import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

import { Controller } from 'react-hook-form'

export const FormInputRadio = ({
  name,
  control,
  label,
  rules,
  error,
  options,
  ...rest
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ))
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, value },
          //fieldState: { error },
          //formState,
        }) => (
          <RadioGroup value={value} onChange={onChange} {...rest}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
      {error && (
        <FormHelperText>
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  )
}
