import ICustomer, { defaultCustomer } from "./Customer";

interface IAccount {
  accountID: number | null;
  customer: ICustomer;
  currentBalance: number;
}

export const defaultAccount: IAccount = {
  accountID: null,
  customer: defaultCustomer,
  currentBalance: 0,
};

export default IAccount;
