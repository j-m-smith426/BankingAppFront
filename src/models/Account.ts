import ICustomer, { defaultCustomer } from "./Customer";

interface IAccount {
  accountID: number | null;
  customer: {
    customerUniqueID: number;
  };
  currentBalance: number;
}

export const defaultAccount: IAccount = {
  accountID: null,
  customer: {
    customerUniqueID: 0,
  },
  currentBalance: 0,
};

export default IAccount;
