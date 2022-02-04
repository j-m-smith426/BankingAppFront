import ICustomer, { defaultCustomer } from "./Customer";

interface IAccount {
  accountID: number | null;
  customer: {
    user: {
      userID: number;
    };
  };
  currentBalance: number;
}

export const defaultAccount: IAccount = {
  accountID: null,
  customer: {
    user: {
      userID: 0,
    },
  },
  currentBalance: 0,
};

export default IAccount;
