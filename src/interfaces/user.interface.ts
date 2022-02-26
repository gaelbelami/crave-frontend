export interface IUser {
    lastName: string;
    firstName: string;
    email: string;
    confirmNewEmail: string;
    phoneNumber: string | null;
    address: string | null,
    password: string; 
    confirmPassword: string;
    oldPassword: string;
    username: string;
    birthdate: string;
    avatar: any;
}

export type ICreateAccountForm = Required<Omit<IUser, "oldPassword" | "username" | "confirmNewEmail" | "address" | "phoneNumber">>;
export type ILoginForm = Required<Pick<IUser, "email" | "password">>;
export type IResetPasswordForm = Required<Pick<IUser, "password" | "confirmPassword">>;
export type IChangePasswordForm = Required<Pick<IUser, "password" | "confirmPassword">>;
export type IChangeEmailForm = Required<Pick<IUser, "email" | "confirmNewEmail">>;
export type IEditProfileForm = Partial<Pick<IUser, "lastName" | "firstName" | "username" | "phoneNumber" | "address" | "email" | "password" | "birthdate" | "confirmPassword">>;
export type IForgotPasswordForm = Required<Pick<IUser, "email">>;