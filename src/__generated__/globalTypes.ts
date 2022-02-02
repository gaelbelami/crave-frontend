/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  client = "client",
  delivery = "delivery",
  owner = "owner",
}

export interface CreateUserAccountInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
