interface IUser {
  userID: number | null;
  password: string | null;
  userRole: {
    roleID: number;
    roleName: string;
  };
  verified: boolean;
}

export const emptyUser: IUser = {
  userID: 0,
  password: "",
  userRole: {
    roleID: 2,
    roleName: "USER",
  },
  verified: false,
};

export default IUser;
