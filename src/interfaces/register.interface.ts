import { UserRole } from "../__generated__/globalTypes";

export interface ICreateAccountForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}