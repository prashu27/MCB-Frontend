import initialTransactions from './transactions.json'

const transactions = initialTransactions

export const getTransactions = () => {
  return transactions
}

export const addTransaction = (transaction) => {
  transactions.push(transaction)
}
