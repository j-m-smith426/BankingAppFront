interface ITransaction {
  transactionID: number | null;
  referenceName: string;
  transaction_date: string;
  transaction_type: string;
  transaction_subtype: string;
  currentBalance: number;
  associatedAccount: {
    accountID: number;
  };
}

export const defaultTransaction: ITransaction = {
  transactionID: 0,
  referenceName: "",
  transaction_date: "",
  transaction_type: "",
  transaction_subtype: "",
  currentBalance: 0,
  associatedAccount: {
    accountID: 0,
  },
};

export default ITransaction;
