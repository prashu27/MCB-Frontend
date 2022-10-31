import { getTransactions } from './data/transactions'

export const getFormattedDate = () => {
  const date = new Date()
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
}

export const getIncrementalNumber = () => {
  const lastTransactionReference = getTransactions().slice(-1)[0].reference
  let getLastNo = Number(lastTransactionReference.slice(10))
  getLastNo++
  getLastNo = getLastNo.toString()
  getLastNo = getLastNo.padStart(4, 0)
  return getLastNo
}
