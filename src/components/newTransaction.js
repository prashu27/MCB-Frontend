import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import {
  Alert,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Snackbar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FormInputText } from './Form/formInputText'
import { FormInputDropdown } from './Form/formInputDropdown'
import {
  getCurrencyType,
  getCustomerType,
  getRegions,
} from '../data/dropdownOptions'
import { FormInputRadio } from './Form/formInputRadio'
import { getFormattedDate, getIncrementalNumber } from '../util'
import { addTransaction } from '../data/transactions'
import { CloseOutlined } from '@mui/icons-material'

const defaultValues = {
  customerType: '',
  reference: `CUS${getFormattedDate()}${getIncrementalNumber()}`,
  customerNo: '',
  customerName: '',
  address: '',
  phoneNo: '',
  transferAmt: '',
  transferCurrency: 'undefined',
  beneficiaryBank: '',
  beneficiaryAccountNo: '',
  paymentDetails: '',
  cardDetails: '',
  region: 'undefined',
}

const NewTransaction = (props) => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const methods = useForm({ mode: 'onChange', defaultValues })
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = methods

  const onFormSubmit = (data) => {
    try {
      setLoading(true)
      const newTransaction = {
        customerType: data.customerType,
        reference: data.reference,
        customer: {
          customerNo: data.customerNo,
          customerName: data.customerName,
          address: data.address,
          phoneNo: data.phoneNo,
        },
        transferAmt: data.transferAmt,
        transferCurrency: data.transferCurrency,
        beneficiaryBank: data.beneficiaryBank,
        beneficiaryAccountNo: data.beneficiaryAccountNo,
        paymentDetails: data.paymentDetails,
        cardDetails: data.cardDetails,
        region: data.region,
      }

      setTimeout(() => {
        addTransaction(newTransaction)
        setLoading(false)
        setOpen(true)
        navigate('/dashboard')
      }, 5000)
    } catch (error) {
      console.log('error is ', error)
      setLoading(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseOutlined fontSize="small" />
    </IconButton>
  )

  const onErrors = (error) => console.error('error is ', error)

  const trapSpacesForRequiredFields = (value) =>
    !!value.trim() || 'Whitespace not allowed'

  return (
    <>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Transaction Completed Successfully
          </Alert>
        </Snackbar>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            opacity: loading ? 0.5 : 1,
            pointerEvents: loading ? 'none' : 'initial',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color={'primary.main'}
            sx={{ mb: 5 }}
          >
            Create New Transaction
          </Typography>
          <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
            {loading && (
              <CircularProgress
                size={48}
                sx={{
                  color: 'info',
                  position: 'absolute',
                  top: '50%',
                  left: '45%',
                }}
              />
            )}
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormInputRadio
                    name="customerType"
                    label="Customer Type*"
                    control={control}
                    rules={{
                      required: 'Please select a Customer Type',
                    }}
                    options={getCustomerType}
                    sx={{ height: '50px' }}
                    error={errors?.customerType?.message}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInputText
                    disabled={true}
                    name="reference"
                    control={control}
                    label="Reference*"
                    rules={{
                      required: 'Reference is required',
                      validate: trapSpacesForRequiredFields,
                    }}
                    error={errors?.reference?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInputText
                    name="customerNo"
                    control={control}
                    label="Customer Number*"
                    rules={{
                      required: 'Customer Number is required',
                      validate: trapSpacesForRequiredFields,
                    }}
                    error={errors?.customerNo?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInputText
                    name="customerName"
                    control={control}
                    label="Customer Name*"
                    rules={{
                      required: 'Customer Name is required',
                      validate: trapSpacesForRequiredFields,
                    }}
                    error={errors?.customerName?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    name="address"
                    control={control}
                    label="Customer Address*"
                    rules={{
                      required: 'Address is required',
                      validate: trapSpacesForRequiredFields,
                    }}
                    error={errors?.address?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    name="phoneNo"
                    control={control}
                    label="Customer Phone Number*"
                    rules={{
                      required: 'Phone number is required',
                      validate: trapSpacesForRequiredFields,
                      pattern: {
                        value: /^\d+$/,
                        message: 'Invlaid phone number, Only numbers allowed',
                      },
                    }}
                    error={errors?.phoneNo?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputText
                    name="transferAmt"
                    label="Transfer Amount*"
                    control={control}
                    rules={{
                      required: 'Transfer Amount is required',
                      validate: trapSpacesForRequiredFields,
                      pattern: {
                        value: /^\d+$/,
                        message: 'Invlaid amount, Only numbers allowed',
                      },
                    }}
                    error={errors?.transferAmt?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInputDropdown
                    name="transferCurrency"
                    label="Transfer Currency*"
                    control={control}
                    rules={{
                      required: 'Please select a currency type',
                      validate: (value) =>
                        value !== 'undefined' ||
                        'Please select a currency type',
                    }}
                    options={getCurrencyType}
                    sx={{ height: '50px' }}
                    error={errors?.transferCurrency?.message}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormInputText
                    name="beneficiaryBank"
                    label="Beneficiary Bank*"
                    control={control}
                    rules={{
                      required: 'Beneficiary Bank is required',
                      validate: trapSpacesForRequiredFields,
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          'Invlaid Beneficiary Bank name, Only english characters allowed',
                      },
                    }}
                    error={errors?.beneficiaryBank?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInputText
                    name="beneficiaryAccountNo"
                    control={control}
                    label="Beneficiary Account Number*"
                    rules={{
                      required: 'Beneficiary Account Number is required',
                      validate: trapSpacesForRequiredFields,
                      pattern: {
                        value: /^\d+$/,
                        message: 'Invlaid account number, Only numbers allowed',
                      },
                    }}
                    error={errors?.beneficiaryAccountNo?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInputText
                    name="paymentDetails"
                    label="Payment Details*"
                    control={control}
                    rules={{
                      required: 'Payment Details is required',
                      validate: trapSpacesForRequiredFields,
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message:
                          'Invlaid Payment Details, Only english characters allowed',
                      },
                    }}
                    error={errors?.paymentDetails?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInputText
                    name="cardDetails"
                    label="Card Details*"
                    control={control}
                    rules={{
                      required: 'Card Details is required',
                      validate: trapSpacesForRequiredFields,
                    }}
                    error={errors?.cardDetails?.message}
                    sx={{ width: '90%', margin: '20px 0 25px 0' }}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInputDropdown
                    name="region"
                    label="Region*"
                    control={control}
                    rules={{
                      required: 'Please select a region',
                      validate: (value) =>
                        value !== 'undefined' || 'Please select a Region',
                    }}
                    options={getRegions}
                    sx={{ height: '50px' }}
                    error={errors?.region?.message}
                    disabled={isSubmitting}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <Divider
              sx={{
                my: 10,
                width: '90%',
                mx: '5%',
                borderBottomWidth: 2,
                bgcolor: 'primary.main',
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={reset} sx={{ mt: 3, ml: 1 }}>
                Reset
              </Button>

              <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
                Submit Transaction
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default NewTransaction
