import { UserRole } from "../generated/globalTypes";

export interface ICreateAccountForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}