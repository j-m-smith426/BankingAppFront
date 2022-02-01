import { AnyAction } from "@reduxjs/toolkit";

const redirectReducer = (state = initialRedirect, action: AnyAction) => {
  switch (action.type) {
    case RedirectActions.REDIRECT:
      return { redirectTo: action.payload };
    default:
      return state;
  }
};

export default redirectReducer;

export interface IRedirectState {
  redirectTo: string;
}

const initialRedirect: IRedirectState = {
  redirectTo: "",
};

export enum RedirectActions {
  REDIRECT = "Redirect",
}

interface IRedirect {
  type: RedirectActions;
  payload: string;
}
