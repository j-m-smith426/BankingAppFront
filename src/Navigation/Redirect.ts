import { RedirectActions } from "../redux/actions/redirectReducer";

export const redirectFuc = (link: string) => {
  return { type: RedirectActions.REDIRECT, payload: link };
};
