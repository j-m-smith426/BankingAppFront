import { RedirectActions } from "../redux/actions/reducer";

export const redirectFuc = (link: string) => {
  return { type: RedirectActions.REDIRECT, payload: link };
};
