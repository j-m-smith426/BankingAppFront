import IUser from "./User";

interface ICustomer {
  customerUniqueID: number;
  user: IUser;
  name: string;
  postal: number;
  email: string;
  dob: string;
}

export const defaultCustomer: ICustomer = {
  customerUniqueID: 0,
  user: {
    userID: null,
    password: null,
    userRole: {
      roleID: 2,
      roleName: "USER",
    },
    verified: false,
  },
  name: "",
  postal: 0,
  dob: "",
  email: "",
};

export default ICustomer;
